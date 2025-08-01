# 软件体系架构知识复习

> 课程编码：COMP3027J
>
> 授课教师：邓勇舰
>
> 考核方式：Attendance(20%) + Assignments(20%) （分组）+ Final Exam (60%)
>
> 期末考试侧重于知识的记忆，考核内容很具体很详细，考前需要花大量时间来记忆，也比较难记，建议使用关键词或自编短语等方法辅助记忆。上课

## Lseeson21: Data Flow Architectural Style(Data Flow Style)

### What is Software Architectural Style?

> Architectural Style 是一种架构分类方法，主要依据架构的**形式（form）、技术（techniques）、材料（materials）等形态特征**。

- 在本课中，它指的是**一类常见的、被实践证明有效的体系结构模式**，具备良好的可复用性与可扩展性。

**软件体系结构风格（Software Architectural Style）具有以下特点：**

1. **描述的是一类架构，而非某一个具体系统**

- It describes a **class of architectures** that appear repeatedly in practice.

2. **与具体问题无关（problem-independent）**

- 可用于解决多个类似问题的通用结构思维方式。

3. **可复用的设计决策包（a package of design decisions）**

- 包括组件类型、连接方式、拓扑结构、语义约束等。

4. **允许一个架构中使用多个风格**

- 多风格混合是实际系统的常见情况。

**Benefits of Software Architectural Style**

| 序号 | 优势内容             | 英文术语                                 | 中文解释                           |
| ---- | -------------------- | ---------------------------------------- | ---------------------------------- |
| 1    | Promote reusability  | Reusability                              | 包括设计与代码复用                 |
|      | • Design reuse       | Design reuse                             | 同领域系统结构相似，可直接复用架构 |
|      | • Code reuse         | Code reuse                               | 风格中不变实现可共享               |
| 2    | 提高开发效率与生产力 | Development efficiency and productivity  | 减少架构设计工作量                 |
| 3    | 是新设计的起点       | Starting point for new designs           | 提供已有思路以减少摸索             |
| 4    | 增强开发者间沟通     | Communication among designers            | “client-server” 等术语自带语义     |
| 5    | 快速找到可行架构方案 | Quickly find applicable design solutions | 解决方案可快速复用                 |
| 6    | 做出权衡、提前评估   | Make trade-offs and evaluate SA          | 可评估架构利弊以优化设计           |
| 7    | 降低架构设计风险     | Diminish design risks                    | 使用成熟风格避免试错               |

**Content of a Software Architectural Style**（一个风格的构成内容）

| #    | 内容项     | 英文术语       | 中文解释                             |
| ---- | ---------- | -------------- | ------------------------------------ |
| 1    | 名称       | Name           | 每种风格都有唯一、简洁的名称         |
| 2    | 问题描述   | Problem        | 描述该风格旨在解决的问题或问题类别   |
| 3    | 上下文假设 | Context        | 应用该风格的前提条件和限制要求       |
| 4    | 表达模型   | Models         | 用于建模该架构风格结构和行为的方式   |
| 5    | 后果分析   | Consequences   | 使用该风格带来的优势与劣势           |
| 6    | 实现建议   | Implementation | 提供风格实现的技巧或建议             |
| 7    | 现实应用   | Known Uses     | 展示该风格在已有系统中的成功使用案例 |

### Data Flow Architectural Style（数据流风格）

> A data flow system is one in which the **availability of data** controls the **execution of computation**.

数据的存在与流动决定了系统的行为和结构。

**Components of Data Flow Style**

| 组件部分 | 英文术语          | 描述                     |
| -------- | ----------------- | ------------------------ |
| 输入端口 | Input Port        | 从外部读取数据           |
| 输出端口 | Output Port       | 向外部输出数据           |
| 执行模型 | Computation Model | `Read → Compute → Write` |

---

**Connectors of Data Flow Style（数据流连接件）**

| 属性     | 内容                              |
| -------- | --------------------------------- |
| 类型     | 数据流（Data Stream）             |
| 流向     | 单向（Unidirectional）            |
| 同步性   | 通常异步（Asynchronous）          |
| 是否缓冲 | 有缓冲（Buffered）                |
| 接口角色 | Reader 与 Writer                  |
| 模型     | 从输出端口 → 输入端口进行数据传输 |

---

**Patterns of Data Flow**

| 模式名称 | 英文术语 | 描述 |
|----------|-----------|------|
| 顺序处理流 | Sequential Flow | 数据线性流动 |
| 分支 / 汇聚 | Branch & Merge | 数据拆分/合并 |
| 闭环结构 | Cyclic Flow | 数据可循环处理 |

### Batch Sequential Architectural Style（批处理顺序风格）

**定义**

1. **Component** 是**独立程序**（independent programs）
2. **Connector** 是某种媒介，如传统的磁带（tape）或文件
3. **Topology** 由连接件定义的数据流图（data flow graph）
4. 每一步必须在**前一步完成后**才能启动（sequential）
5. **传输的数据是整体的**，不能流式传输

### Pipe-and-Filter Architectural Style（管道-过滤器风格）

> A pipeline is composed of a chain of filters. Each filter reads from input, processes, and passes data to the next via a pipe.

- **Filter**：每个 Filter 实现一个处理逻辑（算法或计算）

- **Pipe**：连接前后两个 Filter，传输数据（可以缓冲）

- **Data Source / Sink**：也可以看作是特殊的 Filter

数据以**流式（stream）**形式从源头进入，第一个 Filter 处理后输出数据传递给下一个 Filter，依此类推直到终点。

**特性与优势**

| 特性          | 描述                                   |
| ------------- | -------------------------------------- |
| High cohesion | 每个 Filter 执行单一功能，模块化强     |
| Low coupling  | Filter 之间只通过 Pipe 通信            |
| 可扩展性      | 易于新增过滤器                         |
| 并发性        | 支持并发（concurrent or sequential）   |
| 流式处理      | 支持**实时处理**，不需等待整个数据完成 |

**局限性（Disadvantages）**

- 不适合**需要用户交互的系统**（不支持 GUI）
- 性能受限：每个 Filter 可能有不同的数据格式转换，导致格式解析成本高
- 对**共享数据要求高的系统不适合**

### Batch Sequential vs. Pipe-and-Filter

| 比较维度 | Batch Sequential | Pipe-and-Filter |
| -------- | ---------------- | --------------- |
| 数据传输 | Whole data | Incremental |
| 粒度 | Coarse-grained | Fine-grained |
| 延迟 | High | Low  |
| 并发 | Not possible | Possible |
| 实时性 | Poor | Good |

- Batch Sequential 是**整体式处理**，严格按顺序依赖；

- Pipe-and-Filter 是**流式处理**，每个过滤器可以独立执行，并发执行成为可能。

## Lesson31: Event Systems Style

### What is an Event?（什么是事件）

> An event is an action that activates the functionality of an object.

- 当某个行为发生时，一个对象会收到消息，并执行与该事件相关联的功能。

- 事件驱动系统的核心逻辑是：“**事件触发 —> 查找处理程序 —> 执行对应行为**”。

### Event Systems Architectural Style（事件系统风格）

> **An implicit-invocation-style system** is one in which an event implicitly causes the invocation of procedures in other modules. 

**基本特征**

- 事件源组件（**Event Source**）可以广播（**announce**）事件。
- 其他组件（**Event Handlers**）可以注册对某事件的兴趣，并绑定处理过程。
- 当事件被广播时，**系统自动调用所有注册的处理过程**，无需源组件显式指定。

**构成结构（Components）**

| 元素     | 英文术语                     | 说明                                     |
| -------- | ---------------------------- | ---------------------------------------- |
| 构件     | Component                    | 包含过程（Procedure）和事件（Event）接口 |
| 构件角色 | Event Source / Event Handler | 可同时是源和处理器                       |
| 接口     | Procedure & Event Set        | 提供处理逻辑与事件注册能力               |

**连接件（Connectors）**

- 本质是事件与处理器过程的绑定（**event-procedure binding**）
- 一旦事件被广播，系统自动隐式地调用所有绑定过程
- 调用顺序是不确定的（**non-deterministic**）

### Dispatch Mechanism of Event Systems（事件调度机制）

> 事件系统根据是否使用独立调度模块，可分为两类：With / Without Dispatcher Module

**Without Dispatcher Module**（无独立调度器）

- 又称为 **Observable/Observer Pattern**（观察者模式）

- 每个模块允许其他模块订阅它可能发布的事件

- 当模块发布事件时，**只发送给订阅该事件的模块**

**With Dispatcher Module**（有独立调度器）

调度器模块负责统一接收所有事件，并将它们分发到对应模块：

方式一：All Broadcasting（全广播）

> 事件广播给所有模块，由模块自己决定是否响应（是否感兴趣）

- 所有模块都收到事件，但只有“感兴趣的”模块执行行为

方式二：Selected Broadcasting（选择性广播）

> 事件只被派发给事先注册过的模块

- 更高效，但需要事先订阅

**Selected Broadcasting 又分两种策略：**

| 策略      | 英文术语                       | 描述                                     |
| --------- | ------------------------------ | ---------------------------------------- |
| 点对点    | Point-to-Point (Message Queue) | 每条消息只被一个消费者消费，消费后即删除 |
| 发布-订阅 | Publish-Subscribe              | 事件可以被多个订阅者获取，不立即删除     |

### Advantages & Disadvantages（优缺点）

**Advantages of Event Systems**

| 编号 | 优势                                                      |
| ---- | --------------------------------------------------------- |
| 1    | 解耦：事件管理器与处理器职责分离，低耦合（**decoupled**） |
| 2    | 替换 / 增加模块容易（**easy replacement**）               |
| 3    | 单个组件故障不会影响整体系统                              |
| 4    | 高复用潜力（**reusability**）                             |

**Disadvantages of Event System**

| 编号 | 缺点                                                |
| ---- | --------------------------------------------------- |
| 1    | Dispatcher 处理多个事件输入困难（尤其是同时触发时） |
| 2    | Dispatcher 出错会导致系统失效                       |
| 3    | Dispatcher 是性能瓶颈                               |
| 4    | 事件未被处理无法保证（**no guarantee**）            |

## Lesson: Call/Return Style

### Call/Return Architectural Style 概述

 定义

> Call/Return 风格是一类以**明确过程调用（call）和返回（return）**为基础的体系结构风格，强调主程序对子程序、对象、层级等的调用控制。

该风格包括以下几种典型子风格：

| 风格              | 英文术语                  | 简述                       |
| ----------------- | ------------------------- | -------------------------- |
| 主程序-子程序风格 | Main Program & Subroutine | 单线程、层级调用结构       |
| 面向对象风格      | Object Oriented Style     | 以封装、继承、多态为核心   |
| 分层风格          | Layered System Style      | 模块按层划分，上层调用下层 |
| 客户端-服务器风格 | Client/Server Style       | 基于网络的调用请求结构     |

### Main Program & Subroutine Style 主程序与子程序风格

 适用问题（Problem）

适用于**可分解为过程调用层级的应用程序**，例如排序、搜索、数值分析等。

上下文（Context）

大多数过程式编程语言（如 C, Pascal）天然支持此结构：支持过程嵌套、命名空间、模块化、单线程控制等。

解决方案（Solution）

| 构成项            | 内容                                                    |
| ----------------- | ------------------------------------------------------- |
| System Model      | 调用层次结构（Call & Definition Hierarchy）             |
| Components        | 过程（Procedures）和显式数据（Explicitly visible data） |
| Connectors        | 过程调用与数据共享                                      |
| Control Structure | 单线程执行（Single thread of control）                  |



------

模块分解策略（Parnas 模块化建议）

| 原则                                    | 说明                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| Hide secrets                            | 屏蔽变化点，如Representation of data、Properties of a device、Mechanisms that support policies |
| Localize future changes                 | 将未来可能变化的部分隔离到模块中                             |
| Use interfaces                          | 接口中只暴露不易变化的假设                                   |
| Prefer function call over data exposure | 提倡通过函数暴露能力而非直接数据结构                         |

### Object-Oriented Style 面向对象风格

Problem

当软件系统的核心是**管理与封装数据及其行为**时，OO风格是最适合的结构。

 Context

- 面向对象语言（如 Java、C++、Python）支持对象封装、继承、多态等特性，天然契合此风格。
- 同时有大量设计方法（如 UML、领域建模）支撑对象识别与设计。

Solution

| 构成项            | 内容                                              |
| ----------------- | ------------------------------------------------- |
| System Model      | 本地状态维护（Localized state maintenance）       |
| Components        | 对象（Objects）、管理器（Managers）、抽象数据类型 |
| Connectors        | 方法调用（Procedure Call）                        |
| Control Structure | 去中心化，通常为单线程（Decentralized）           |

特性（Characteristics）

| 特性       | 英文术语              | 中文说明                   |
| ---------- | --------------------- | -------------------------- |
| 封装       | Encapsulation         | 限制状态访问，隐藏内部信息 |
| 多态       | Polymorphism          | 运行时选择不同实现         |
| 继承       | Inheritance           | 功能继承，接口共享         |
| 交互       | Interaction           | 通过方法调用或协议         |
| 复用与维护 | Reuse and Maintenance | 通过模块化与封装提升生产力 |

Problems of Object Oriented

| 类别 | 问题描述 | 英文说明 |
| ---- | -------- | -------- |
| Too many objects | 对象数量庞大，系统结构混乱 | “A vast sea of objects requires additional structuring.” |
| Complex interactions | 接口过于集中或复杂 | “A single interface can be limiting & unwieldy.” |
| Behavior distribution | 行为分布，难以理解系统 | “Responsibility is distributed; makes system hard to understand.” |
| Hard to trace flow | 缺乏结构化，流程难追踪 | “Interaction diagrams are needed for design.” |
| Reuse limitations | 类不够表达设计族 | “Types/classes often not enough to capture design families.” |
| Flat hierarchy | 系统平面化，缺少分层 | “Pure O-O systems may be large and flat.” |

Solutions to OO Problems（问题解决策略）

| 策略                                | 说明                                              |
| ----------------------------------- | ------------------------------------------------- |
| Use hierarchical structuring        | 建议使用**层级化设计**（e.g., packages, modules） |
| Apply Design Patterns               | 通过**设计模式**建立结构规范（如 MVC、Observer）  |
| Use layered or client/server styles | 面向对象结构可与**Layered 或 C/S 风格结合**       |

### Layered System Style 分层风格

**Problem**

- 适用于**服务层次分明、职责清晰**的系统，如操作系统、网络协议栈、Web 应用结构。
- 系统服务可以自然划分为多个层级，例如：
  - 底层为系统服务（如文件系统、网络）
  - 中间为通用功能层（如数据库访问）
  - 顶层为具体应用逻辑（如用户界面）

 Context（上下文）

- 高层设计阶段中经常使用分层思想
- 每一层服务类任务被归为一组
- 可以结合不同架构模式来细化每层

 Solution（解决方案）

| 构成要素          | 英文术语                                    | 描述                                    |
| ----------------- | ------------------------------------------- | --------------------------------------- |
| System Model      | Hierarchy of opaque layers                  | 不透明的分层结构                        |
| Components        | Usually composites                          | 每层是多个过程或模块的集合              |
| Connectors        | Procedure calls under restricted visibility | 仅允许调用相邻层；有时也用 C/S 调用形式 |
| Control Structure | Single thread                               | 控制流从顶层到底层逐层调用              |

**关键点**：每层只知道下层的接口，不关心其内部实现（**information hiding**）

**Advantages of Layered System Style（分层风格优点）**

| 编号 | 英文描述                                   | 中文解释                       |
| ---- | ------------------------------------------ | ------------------------------ |
| 1    | High cohesion within layers                | 每层内部功能相关，**高内聚**   |
| 2    | Layer isolation (hide private info)        | **封装性强**，可隐藏内部实现   |
| 3    | Low coupling (only use adjacent layers)    | **低耦合**，上层只依赖下层     |
| 4    | Reusability & replaceability               | 易于复用、扩展或替换某一层     |
| 5    | Example: change DB only affects data layer | 举例：换数据库只影响数据访问层 |

此外，还能：

- 减少变更影响范围（修改某层最多影响相邻两层）
- 控制复杂度，提高系统的可维护性

**Disadvantages of Layered System Style**

- Performance overhead in Strict Layered Style
- Not always easy to structure in clean layers
- Layers call each other, affecting performance

### Client/Server Style 客户端-服务器风格

 **Definition**

> **Client/Server architecture** is a style where components are divided into clients and servers. The client initiates requests, and the server processes and returns responses.

即：将系统划分为两个角色：

- **Client（客户端）**：发起请求、处理用户输入/输出
- **Server（服务器）**：响应请求，执行处理逻辑

这是一种**资源不对等结构（asymmetric interaction）**，客户端依赖服务器。

Application Context（适用场景）

- **适用于网络环境下的分布式系统**，如企业管理系统、数据库系统、Web 应用等。
- 多用户共享资源（如数据库、文件、打印机）或分布式任务处理。

Structural Elements（结构组成）

| 元素                 | 英文术语                              | 描述                               |
| -------------------- | ------------------------------------- | ---------------------------------- |
| 构件（Components）   | Clients and Servers                   | 客户端发起请求，服务器响应         |
| 连接器（Connectors） | RPC (Remote Procedure Call) protocols | 客户端通过网络远程调用服务器功能   |
| 拓扑结构（Topology） | 1-to-N (One server, multiple clients) | 客户端间无直接通信，仅与服务器交互 |

------

Characteristics（特征）

| 特征                         | 英文术语                           | 解释 |
| ---------------------------- | ---------------------------------- | ---- |
| client depends on the server | 非对称通信，客户端主动，服务器被动 |      |
| One-to-many topology         | 多客户端对一服务器                 |      |
| Client mobility              | 支持客户端在不同地点接入           |      |
| Server-side security         | 通常服务器进行统一访问控制         |      |
| Distributed deployment       | 支持将功能模块分布于不同节点       |      |

> “The server is unaware of the clients. The client knows and calls the server.”

------

Advantages of Client/Server Style（PPT p33）

| 优势编号 | 英文描述                       | 中文解释                                    |
| -------- | ------------------------------ | ------------------------------------------- |
| 1        | Efficient network utilization  | 高效利用网络与系统资源                      |
| 2        | Easy to scale / upgrade server | 易于升级服务器功能                          |
| 3        | Resource sharing               | 支持多用户共享资源                          |
| 4        | Scalability by adding clients  | 客户端可动态添加，实现扩展性（scalability） |



------

  Disadvantages of Client/Server Style

| 问题编号 | 英文描述                                | 中文解释                                   |
| -------- | --------------------------------------- | ------------------------------------------ |
| 1        | Redundant management in servers         | 各服务器需重复管理，冗余工作               |
| 2        | No central registry of services         | 无法集中查询服务状态，缺少服务发现机制     |
| 3        | hard to modify                          | 应用逻辑分布在客户端和服务器，**难以更改** |
| 4        | Scalability limited by server & network | 可扩展性受限于服务器能力与网络带宽         |



------

**Two-Tier vs Three-Tier Architecture（二层与三层结构）**

Two-Tier（厚客户端 Thick Client）

| 层次   | 功能                                       |
| ------ | ------------------------------------------ |
| Tier 1 | Client handles UI + part of business logic |
| Tier 2 | Server handles DB management               |

**问题**：

- High requirements for client software and hardware configuration
- Complicated client program design
- Data security is bad. Client programs can directly access the
  database server
- Single information content and form
- Different styles of the user interface, complex use, no use of
  promo- tional use
- Software maintenance and upgrades are difficult. Software
  on each client requires maintenance

 Three-Tier（三层架构 Thin Client）

| 层级   | 英文名称          | 功能                         |
| ------ | ----------------- | ---------------------------- |
| Tier 1 | Presentation Tier | 用户界面层，部署在客户端     |
| Tier 2 | Application Tier  | 应用逻辑层，部署在中间服务器 |
| Tier 3 | Data Tier         | 数据层，管理数据库资源       |



- 各层**逻辑上独立**，可分别部署与维护
- 常见于 Web 应用结构

------

###  B/S 架构（Browser/Server）

> B/S is a special case of 3-tier architecture. The client is a browser.

| 特征       | 描述                             |
| ---------- | -------------------------------- |
| 通信方式   | HTTP/HTTPS 协议（标准化）        |
| 客户端形式 | 浏览器 + 插件（Flash、JVM）      |
| 安全风险   | SQL 注入，跨站脚本（难控制）     |
| 性能问题   | 客户端资源浪费，服务器负载大     |
| 缺点       | 仅支持“拉取”方式（不能主动推送） |

## Data-centered Architectural Style（数据中心风格）

### Data-centered Style

> **A data-centered architecture** is one where components communicate through a central data store (shared data source)

该风格强调数据是“第一公民”（first-class citizen），即所有操作都以数据为中心展开，而不是以过程或事件为中心。

- Window注册表
- 剪切板

### Repository Style

> A **repository** is a central place where data is stored and maintained. Components operate on this shared data via defined interfaces. (仓库是储存和维护数据的中心场所)

 **系统结构组成（System Components）**

| 元素         | 英文术语               | 说明                         |
| ------------ | ---------------------- | ---------------------------- |
| 中心数据结构 | Central data structure | 表示系统的当前状态           |
| 操作组件     | Independent components | 对中心数据进行读取/写入/处理 |
| 连接件       | Connectors             | 数据读写、事务传输等机制     |

**两类主要连接机制**

| 类型                     | 说明                             |
| ------------------------ | -------------------------------- |
| **Database Mechanism**   | 输入数据触发预定义事务过程       |
| **Blackboard Mechanism** | 中心数据状态变化驱动处理过程选择 |

### Blackboard Style

> The **Blackboard architecture** is used when no deterministic solution sequence exists, and problem-solving relies on collaborative, opportunistic interaction among specialized components.

**定义：**

- *State-driven execution based on changes in the shared data (blackboard).*

- *Multiple independent knowledge sources collaborate by reading/writing to the blackboard.*

- *A central controller monitors blackboard state and activates appropriate knowledge sources.*

**适用问题特征**

- 可能存在多个中间解、多个解法路径 (Multiple methods may solve the problem)

- 无法提前定义明确的处理流程 （Unable to find a define solution strategy)
- 问题需要跨多个领域的知识源协作求解 (Requires expertise in multiple fields to be solved collaboratively)
- 举例场景：自然语言处理、图像识别、模式识别等 AI 系统

**Blackboard Style如何解决上述问题**

- Solves a large problem by dividing it into multiple sub-problems.
- Each solver (knowledge source) focuses on a specific aspect of the problem.
- Knowledge sources are independent and do not call each other directly.
- A global data structure (the blackboard) maintains the current state of the solution.
- All solvers read from and write to the blackboard to share information.

**核心结构组成（Structure）**

| 组成部分 | 英文术语          | 功能                                     |
| -------- | ----------------- | ---------------------------------------- |
| 黑板     | Blackboard        | 全局共享数据空间，存储当前求解状态       |
| 知识源   | Knowledge Sources | 独立的求解程序，仅通过黑板通信           |
| 控制器   | Controller        | 监视黑板状态，决定哪个知识源可被激活执行 |

**Blackboard data structure**

1. Globle database containing entire state of problem solution.
2. Problem-solving data is structured in an application-specific hierarchy.
3. Incremental Updates by Knowledge Sources
4. All interactions between solvers occur only through the blackboard.

**Knowledge Sources**

1. Each knowledge source solves a specific sub-problem independently.
2. Knowledge sources encapsulate expertise in particular domains.
3. Once executed, a knowledge source updates the blackboard state.
4. Blackboard-based Communication Only

**Controller**

1. The controller includes a **supervisor** and a **scheduler** to support reasoning.
2. The supervisor monitors the blackboard and activates relevant knowledge sources based on state changes.
3. The scheduler selects the most appropriate knowledge source and updates the blackboard with its result.
4. The controller coordinates the collaborative execution of all knowledge sources.
5. It understands each knowledge source’s capabilities and makes real-time decisions during problem-solving.



**Blackboard 特征总结**

| 特征                         | 说明                                        |
| ---------------------------- | ------------------------------------------- |
| Global shared memory         | 所有组件共享对黑板的访问权限                |
| Incremental update           | 解是通过状态逐步演化获得的                  |
| Condition-action rule        | 知识源以“当条件满足 → 执行动作”的形式被激活 |
| Asynchronous & collaborative | 各知识源异步工作，互不调用，仅通过黑板通信  |
| Dynamic control              | 控制器动态决定求解流程，非静态流程图        |

## Virtual Machine Style（虚拟机风格）

> **Virtual Machine Style** refers to system architectures where a software-defined abstract machine is used to interpret and execute programs.

系统通过一个模拟的虚拟执行环境来运行不适配于当前平台的功能。它是一种以**抽象机器模型为中心**的架构风格。

**系统分类**

1. **Interpreters**：解释器，模拟执行非原生语言/功能
2. **Rule-based Systems**：Specializatio of an interpreter
3. 其他如 **Shell**, **Command Language Processors**

### Interpreter Style（解释器风格）

**速记**

Interpreter Style is used when a problem requires defining a custom language or when the execution machine is not directly available. It uses a virtual machine model with a state-driven execution engine. Components include the execution engine and three types of memory (interpreter state, program, program state). Control is input-driven. Expert systems are a typical variant where rules are interpreted as programs.

> When the target execution language/machine is not natively available.
>  适用于目标平台不支持直接执行解决方案语言的场景，或需要用脚本描述解决方案。

如脚本系统、虚拟语言中间层（如 JVM、Matlab）、协议解释器等。

**Context**

解释器充当桥梁，**连接“目标语义”和“底层语义”之间的鸿沟**，例如：

- 脚本解释器：从脚本语言 → 机器语义
- 游戏热键绑定系统：按键输入 → 行为映射

**Solution**

| 元素     | 英文术语                       | 说明                         |
| -------- | ------------------------------ | ---------------------------- |
| 系统模型 | Virtual Machine                | 抽象状态机模拟目标运行环境   |
| 构件     | Execution Engine, Memories     | 状态机 + 程序状态 + 解释状态 |
| 连接器   | Data access, Procedure Call    | 解释流程驱动 + 状态转移机制  |
| 控制结构 | Input-driven state transitions | 由输入触发状态迁移           |



**Interpreter architectural style and its components.**

*Problem*

1. Used when the **target language or machine is not directly executable**.
2. Suitable for applications where the key problem is **defining a custom notation or scripting language**.

*Context*

1. Bridges the gap between a **desired abstract language** and an **available execution environment**.

*Solution*

1. Based on a **virtual machine** model.
2. Executes input programs via **interpretation, not compilation**.

*Components*

1. One state machine
2. **Three memories**:
    a) program to interpret
    b) interpreter state
    c) program state (variables, stack)

*Connector*

1. data access and procedure call

*Control Structure*

1. Based on **state transitions in the interpreter**.
2. input driven for selection of what to interpret

**优点（Advantages）**

| 类型          | 内容                                  |
| ------------- | ------------------------------------- |
| Functionality | Can simulate non-native functionality |
| Testing       | Can simulate “disaster” modes         |
| Flexibility   | Very general-purpose tool             |

缺点（Disadvantages）

| 类型       | 内容                                          |
| ---------- | --------------------------------------------- |
| Efficiency | Much slower than hardware and compiled system |
| Complexity | 多一层解释结构 → 软件层次更复杂               |

**应用实例（Applications）**

| 应用类型                   | 举例                                       |
| -------------------------- | ------------------------------------------ |
| **Interpreted language**   | JavaScript, Python, VBScript, HTML, Matlab |
| 配置系统                   | 脚本、命令文件、嵌入配置语言               |
| **user input**             | 游戏热键、菜单选择处理                     |
| **Communication Protocol** | 输入指令解析、FSM 解释器                   |

### Rule-based System

> A **Rule-based system** is a specialization of an interpreter that executes **condition-action rules** from a **knowledge base**.

本质上，它是一个**以规则集合为程序**、以**推理引擎（inference engine）**作为执行器的解释器系统。

**Characteristics of Rule-based System**

- Code to be executed (knowledge base)
- Interpretation engine (rule interpreter)
- Control state of interpreter (rule/data selection)
- Current state of the code (working memory)

**应用实例：Drools 系统**

- Drools 是 Redhat 提供的商业规则系统（基于 Java）
- 用于业务逻辑解耦、规则抽象、业务知识管理
- 场景：24小时在线服务系统、规则频繁变更系统、大型分布式系统

## Software Architecture Description

> “前几章教你如何设计架构（选风格） → 这一章教你如何**表达和建模你的架构**，让别人理解和维护它。”

### Software Architecture Description（软件架构描述）

#### **What is Software Architecture Description**

软件架构由三类结构元素组成：

- **Processing components**：负责处理数据的处理组件；
- **Data components**：表示处理信息的数据组件；
- **Connection components**：用于将其他组件组合和连接的连接组件。

**架构描述的作用：**

- It served as blueprint of software system

- It defines **Work Distribution**；
- Carrier of Quality Attributes；
- Tool for **Early Analysis**；
- Support to maintenance and Mining；
- Design Communication

> Software architecture description is the blueprint of a system. It defines work distribution, carries quality attributes, enables early analysis, supports maintenance, and communicates design decisions for long-term understanding.

#### **Traditional Method 问题**

传统工业界的描述方法存在缺陷：

- "用 UML 就行了吗？"
- "我有类图了还需要什么？"
- "自然语言不好"
- "如何记录变化的信息？"

说明业界仍缺乏系统化、可维护的架构描述机制。

#### **架构文档编写七项原则**

1. **以读者为中心**(Write from reader's perspective)：让读者容易找到所需信息；
2. **避免重复** (Avoid unnecessary duplication)：每条信息只描述一次；
3. **避免歧义** (Avoid ambiguity)：使用明确定义的语言或图例；
4. **使用标准结构** (Use standard organizational structures)：保持文档风格统一；
5. **记录决策理由** (Record the reasons)：解释为何作出特定设计；
6. **保持更新但不过度频繁** (Keep documents current but not updated frequently)：按计划更新，选关键时间点；
7. **定期回顾是否满足需求** (Review)：检查是否服务了预期读者和目标。

###Software Architecture Modeling（软件架构建模）

#### View 架构视图理论

**视图定义：**

- **View** 是架构元素和其关系的表示；
- 每个视图关注架构的一个方面。

**常见问题与视图对应：**

| 问题 | 对应视图 |
| ---- | -------- |
| 程序的执行单元和数据存储是什么？ | Process View |
| 外部软件如何使用系统？ | Use View |
| 数据如何在系统中流动？ | Data Flow View |
| 如何将软件部署到硬件？ | Deployment View |

**视图种类（部分）：**

- **Exploded View**：模块与子模块关系；

- **Usage View**：模块使用关系；
- **Hierarchy View**：分层结构；

- **Class/Generalization View**：类之间的继承/泛化关系；

- **Process View**、**Concurrency View**、**Shared Data View**；

- **Client-Server View**、**Deployment View**、**Implementation View**；

- **Work Distribution View**：团队工作分配。

#### **视图建模标准与4+1模型**

**View-based architecture modeling specification.**

 **视图选择：**

- 列出架构关注点；
- 选择适用的视图并打勾；
- 合理合并视图、按需排序。

**4+1 View Model（Rational公司提出）**：

1. **Logical View**：Focus: *Behavioral requirements*，如类、对象、状态、交互；包含：Class diagrams, object diagrams, state diagrams and communication diagrams
2. **Process View**：解决并发和分布问题；Concurrency and distribution: 包含： activity diagram
3. **Development View**：Organizes *modules, libraries, packages, and components*; 包含：package diagrams and component diagrams
4. **Physical View**：系统物理部署结构；Maps *software elements to hardware nodes and communication links*: 包含： deployment diagram.
5. **Use Case View**：以用户场景串联以上视图。System functionality from user perspective; 包括： Use Case Diagram

> The 4+1 View Model describes software architecture from five perspectives: Logical View (object structure), Process View (concurrency), Development View (module organization), Physical View (deployment), and Use Case View (scenarios). These views address different concerns and together ensure a comprehensive understanding of the system.

#### **UML 建模元素综述**

**Modeling Elements**

- Structural：类、接口、组件等；
- Behavioral：状态机、交互；Interaction, State machine
- Grouping：包、子系统；Package, subsystem
- Others：注释等辅助元素。

**Relationships**

- 依赖（Dependency）、关联（Association）、聚合（Aggregation）、组合（Composition）、泛化（Generalization）、实现（Realization）。

 **Extensibility Mechanisms**

- 构造型（Stereotype）、标记值（Tagged value）、约束（Constraint）。

**UML共13种标准图：**

- 静态视图：Use Case、Class、Object、Component、Deployment、Package、Composite；
- 动态视图：Sequence、Communication、State Machine、Activity、Timing、Interaction Overview

## Quality Attributes- Availability

### The Meaning of Quality Attributes

质量属性（Quality Attributes, QA）是非功能性需求，**并不由功能决定**。要实现系统功能，必须赋予系统模块正确的职责、资源、调度顺序。只有在功能实现之后，才讨论质量属性。

It is a non-functional requirement and is not determined by function.

**质量属性的实现依赖于三方面**

必须在**设计、实现和部署**三个方面同时考虑：Design, implementation,deployment

- 不可或缺；Indispensable
- 尤其在架构阶段就应考虑其实现方式。

 **常见质量属性**

- Availability（可用性）
- Modifiability（可修改性）
- Performance（性能）
- Security（安全性）
- Testability（可测试性）
- Usability（可用性）

### Quality Attribute Scenario

**为什么需要 QA 场景**

直接说“我想要一个高性能/高安全的系统”太模糊，必须**精确定义“快”或“安全”的含义**，包括优先服务、响应时间、威胁类型等。

**质量属性场景的六要素**

1. **Source**（刺激源）：谁触发了该事件（如用户、攻击者、系统进程）
2. **Stimulus**（刺激）：触发系统反应的事件（如请求到达、系统崩溃、数据泄露）
3. **Artifact**（受影响构件）：受影响的系统部分（如数据库、服务模块、UI）
4. **Environment**（环境）：刺激发生时的系统状态（正常运行、高负载、维护中）
5. **Response**（响应）：系统对刺激的反应行为（如返回结果、切换备份、报警）
6. **Response Measure**（响应度量）：如何评估响应质量（如响应时间 < 2s，恢复时间 < 10min）

### Meaning of Availability

**Definition**

- The probability that the system is available when a user uses；当用户
使用系统时，系统可用的概率
- Maintenance shutdowns determined in advance are not included in
the calculation提前确定的停机维护不计入

**Concerns**

- Whether a failure occurered; 是否发生了故障（故障会被外部感知）；
- Consequences of failure; 故障造成的后果严重性。

**Metrics**

- Available (or down) time percentage
- Time required to repair failure
- mean time between failures

**场景举例**

- Source：Signs of failure; 内外部的故障征兆；
- Stimulus：System faults、Return wrong results、System crash；
- Artifact：计算、存储、网络等系统部分；Compute or storage or network transmission
- Environment：正常或“亚健康”状态；Normal state or "sub-healthy" state
- Response：记录日志、通知管理员、下线维护；
- Response Measure：故障发生比例、修复耗时。Percentage of time to failure, time to repair failure

### Tactics to Improve Availability-Definition

**Tactics**

- Specific design means to meet specific quality attributes
- Is the basic unit of architectural style

**三类策略目标——Reduce the impact of faults**

1. **Fault Detection（故障检测）**
2. **Fault Recovery（故障恢复）**
3. **Fault Avoidance（故障规避）**

**Fault Detection**

- **Ping/echo**：监控组件定期发送 Ping，检查是否有回应；
- **Heartbeat**（心跳）：被监控节点定期发送心跳包，如果多个心跳缺失则认为其失效；
- **Exception Handling**：基于编程语言机制的异常抛出、捕获与处理。

**Fault Recovery**

- **Vote（投票）**：多个冗余模块通过多数投票决策输出；
- **Active Redundancy**：主备同时运行，主失效后立即切换；
- **Passive Redundancy**：主运行，备异步同步，切换时需确认状态一致；
- **Internal Testing（内测 Alpha）**：开发阶段尽早发现问题；
- **Checkpoint/Rollback**：定期保存状态，一旦失败可回滚。

**Fault Avoidance**

- **Service offline**：预知攻击时主动下线；
- **Transaction**：事务机制确保操作的原子性；
- **Process Monitoring**：如 Windows 的任务管理器检测异常。

## QA-Modifiability

### The Meaning of Modifiability（可修改性的含义）

**Concerns**

- Cost of Modification; 修改的花费
- Which parts of the system are modified; 
- When the modification occurs;
- Who performs the modification; 

**Measurement Metrics**

- Time Taken to Complete Modification
- Human Resource Cost of Modification
- Economic Cost of Modification

**场景构建（Scenarios）**

使用场景（Scenarios）可帮助理解：

- **Source of Stimulus（刺激源）**：Who Performs the Modification; 如开发者、管理员或用户；
- **Stimulus（刺激）**：Specific Modifications to Be made; 需要实施的特定修改；
- **Artifacts（受影响构件）**：如功能、UI、交互系统等；
- **Environment（环境）**：如设计阶段、开发阶段或运行阶段；
- **Response（响应）**：操作人员完成修改、测试并部署；
- **Response Measure（度量）**：Time & Cost

### Tactics to Improve Modifiability（提升可修改性的策略）

**目标**：减少修改所需的时间与成本。Reduce the time and cost of modification
 **策略方向**：

1. 限制修改范围（Limiting the Scope of Modification）；
2. 延迟绑定时间（Delaying Binding Time）

**Limiting the Scope of Modification**

- High cohesion, low coupling
- Consider potential modifications
- Make modules generic
- Hide information
- Maintain Consistent interface
- Limit communication paths
- Use intermediaries
- Name server
- Create instance on demand

**Delaying Binding Time**

- Configuration files
- Publish-subscribe style
- Polymorphism

## QA-Performance

### The Meaning of Performance（性能的含义）

**性能关注点（Concerns）**

- 系统响应事件的速度（**Speed of system response to events**）；
- 取决于事件的数量与到达模式（Related to the number and arrival pattern of events）；
- **事件来源**包括User requests, inside the system, outside the system

 **事件到达模式（Arrival Patterns）**

- 随机型（Random）
- 周期型（Regular at specific time scales）
  - 例如：每天/每月/每学期/每年定时到达的批量请求。

**性能场景要素（Performance Scenario）**

- **Source of Stimulus**：May come from inside or outside the system
- **Stimulus**：Event arrival (requires response)
- **Artifact**：系统提供的服务（即被影响的构件）Service；
- **Environment**：系统当前所处的状态，例如正常、紧急、过载；
- **Response**：System processes incoming events, which may lead to state changes
- **Response Measure**：度量系统响应效果的指标：
  - 响应时间（Time taken to process）；
  - 单位时间内处理事件数量；Number of events processed per unit of time
  - Error rate/loss rate

### Tactics to Improve Performance（提升性能的策略）

**策略总览**

目标：在有限时间内完成响应。

策略方向分为三类：

1. **Resource Requirements（资源需求）**
2. **Resource Management（资源管理）**
3. **Resource Arbitration（资源仲裁）**

**资源需求相关策略（Resource Requirements）**

1. **Improve computational efficiency without changing the amount of data**
   - 使用更高效的算法；
   - 减少处理事件所占用的资源。
2. **Reduce the total amount of data to be processed**
   - 限制事件到达速率（例如限流）；
   - 选择性处理部分请求（如采样、预筛）。
3. **Limit execution time**
   - 在指定时间内提供近似解；
   - 限制待处理事件队列长度（如队满即丢弃）。

**资源管理策略（Resource Management）**

1. **并发机制（Concurrency）**
   - 使用多线程、多进程、多核、多机协作以提升吞吐量；
   - 合适的并发模型可大幅提升性能。
2. **Increase available resources**
   - 例如扩大计算资源、存储容量、带宽等。

 **资源仲裁策略（Resource Arbitration）**

1. **先到先服务（FCFS）Fiert-come, Firt-served**
   - 最基础的调度策略。
2. **固定优先级调度 Fixed priority scheduling**
   - 高优先级任务（如军用、高端服务）可优先调度。
3. **动态优先级调度 Dynamic priority**
   - 防止饥饿（Starvation）；
   - 常见策略如 Earliest Deadline First。

## QA-Security

### The Meaning of Security（安全性的含义）

**Concerns**: Resisting attacks on the system while ensuring legitimate users can use the system.

**Attacks:** Attempts to break through the system's security protection

____



**安全的多种维度（Aspects of Security）**

- **Non-repudiation（不可否认性）**：确保行为不能被抵赖；

- **Confidentiality（机密性）**：防止信息泄露；

- **Integrity（完整性）**：防止数据被未授权修改；

- **Assurance（可信性）**：系统设计可信、运行可靠；

- **Availability（可用性）**：确保服务可用；

- **Auditing（审计）**：记录系统行为，方便重建事件。

____



**安全性场景（Security Scenarios）**

- **Sources of Stimulus:** 攻击源可能是用户、人或其他系统；
- **Stimulus**：攻击行为，如信息窃取、权限提升、服务拒绝。
- **Artifact**：系统中被攻击的服务或数据；
- **Environment**：系统运行状态，如联网/断网、内/外部环境、防火墙内外。
- **Response: ** 正常用户使用不受影响，非法用户被拒绝； 建立攻击威慑机制（Deterrence）
- **Response Measurement: ** Difficulty of launching an attack; Difficulty of recovering from an attack



### Tactics to Improve Security

**三类方向：**

**Resisting Attacks（抵御攻击）**

**Detecting Attacks（检测攻击）**

**Recovering from Attacks（从攻击中恢复）**

____

**抵御攻击（Resisting Attacks）**

1. **User Authentication（用户身份验证）**
   - 密码、图形验证码、生物识别（如人脸、指纹）等。
2. **User Authorization（用户授权）**
   - 确保用户的行为在其权限范围内。
3. **Maintain data Confidentiality（保密性）**
   - 对数据和传输过程进行加密（如 HTTPS、VPN）。
4. **Maintain data Integrity（完整性）**
   - 使用 MD5、SHA 等哈希算法确保数据未被篡改。
5. **Reducing Exposure（减少暴露面）**
   - 关闭不必要的端口、服务、SSID 等。
6. **Access Control（访问控制）**
   - 白名单（只允许某些用户/行为）、黑名单（禁止某些行为）。

____

 **检测攻击（Detecting Attacks）**

1. **Combine Software and Human**
   - 使用 IDS（入侵检测系统），辅以人工安全专家分析；
   - 监控系统行为是否异常。
2. **Identification of Attackers**
   - 有助于威慑潜在攻击者；
   - 为后续恢复提供线索。

____



 **从攻击中恢复（Recovering）**

- Restoring State

- 可借助“可用性”策略（如热备份、容灾恢复）进行状态恢复。

### Security Around Us

- Username + Passwords
- Security Cards
- SMS Verification Codes
- Dynamic Passwords

## QA-Testability

### The Meaning of Testability（可测试性的含义）

**Concerns**

- Make software's bugs easy to be tested. (软件中的错误是否容易被检测)
- Verify if the software product matches requirement
- Validate the quality of the software with the least cost and effort

> 目的在于发现错误（Discover faults），而不是证明没有错误。

**The Importance of Testing**

- 40% of cost is spend on testing
- A failure in a large-scale software project can lead to severe consequences
- If testability can be enhanced at the architectural level, the benefits are enormous

 **Testability 场景定义（Scenario）**

六要素定义：

1. **Source of Stimulus**：由谁发起测试？（如开发者、测试工程师、用户等）
2. **Stimulus**：触发测试的时机，如完成某阶段开发
3. **Artifact**：被测试对象，如一个模块、一段代码、一个子系统
4. **Environment**：测试发生的环境（设计期/开发期/部署期/运行时）
5. **Response**：测试过程应当可以顺利执行，且**能观察测试结果**
6. **Response Measure**：如何评估？如Statement coverage.、Decision coverage/branch coverage、Condition coverage

### Tactics to Improve Testability（提升可测试性的策略）

**目标**：让测试变得更容易。

**方向**：

1. **Black-box testing（黑盒测试）**：注重接口输入输出；
2. **White-box testing（白盒测试）**：注重内部结构与执行路径。

**黑盒测试策略（Black-box）**

- **Record / Replay**：支持测试自动化或半自动化。
  - 可重复地重放输入场景，用于调试与回归测试。
- **Separate interfaces from implementations**：
  - 例如使用同一排序接口测试不同的排序算法。
- **Provide specific test paths**
- 核心思想：提供输入，捕获输出。

 **白盒测试策略（White-box）**

- Internal monitoring

  - 使用 IDE 的调试工具（如断点、堆栈查看器）；

  - 使用操作系统级别工具（如 WinDbg）；

  - 这些方法允许深入系统内部观察执行路径与状态。


## QA-Usability

### The Meaning of Usability

 **定义**

**Usability** refers to the ease with which users can learn, operate, and interact with a software system.

> 可用性指用户学习、操作、与系统交互的容易程度。

**Concerns**

Reduce the difficulty for user to use software.

**Facilitate user onboarding**

> 方便新用户快速上手

**Improve efficiency during system use**

> 提高用户使用系统时的效率

**Minimize the impact of user errors**

> 降低用户操作错误造成的后果

**Adapt to user needs**

> 支持个性化或定制功能，满足不同用户需求

**Enhance user confidence and comfort**

> 增强用户的信任感与使用舒适度

____

**Scenario Components 场景六要素**

| Element                | Meaning（含义）                                              |
| ---------------------- | ------------------------------------------------------------ |
| **Source of Stimulus** | End users（最终用户）                                        |
| **Stimulus**           | Want to learn, improve efficiency, reduce errors（希望提升使用体验） |
| **Artifact**           | The entire system（系统整体）                                |
| **Environment**        | Runtime or configuration（运行时或配置状态）                 |
| **Response**           | The system responds to user interaction（系统给出反馈）      |
| **Response Measure**   | Task time, error count, satisfaction, success rate（时间、错误率、满意度等） |

### Tactics to Improve Usability 提升可用性的策略

**目标：** To make it easy for users

**方向**

- Runtime Tactics
- Design-time Tactics

**Runtime Tactics 运行时策略（系统运行时对用户更友好）**

1. **System anticipates user tasks**
    *e.g., input suggestions, search autocomplete*

   > 系统预测用户意图，如输入法联想、搜索框补全

2. **System provides appropriate feedback**
    *e.g., progress bars, loading indicators*

   > 提供及时反馈，避免用户感到迷失或卡顿

3. **System provides consistent experience**
    *e.g., DPI adjustment across resolutions*

   > 保持交互一致性，如高分辨率下自动缩放 UI

**Design-time Tactics 设计时策略（设计阶段改善使用体验）**

1. **Support undo operations**
    *e.g., Ctrl+Z, Recycle Bin*

   > 支持撤销、还原等机制，减少误操作的风险

2. **Isolate the user interface from the rest of the system**
    *e.g., MVC pattern, interface customization*

   > 前后端分离，支持用户界面独立修改、个性化定制

## SA_Evaluation

### Software Architecture Evaluation

**Why Software Architecture Evaluation? 为什么要做软件架构评估**

- **Early detection of problems**

  > 在软件生命周期早期发现架构问题，可大大降低修改成本。

- **Validation of requirements**

  > 验证需求、发现冲突、权衡质量属性，促使利益相关者达成共识。

- **Improved architecture documentation & stakeholder communication**

  > 强制性准备评估资料促使架构更完整清晰，也有助于团队沟通。

**Evaluation Methods 架构评估方法概览**

**SAAM (Scenario-Based Architecture Analysis Method)**

> 最早提出的架构分析方法，最初用于评估可修改性（modifiability），也可扩展至其他非功能属性。

 **ATAM (Architecture Tradeoff Analysis Method)**

> SAAM 的改进版本，**显式考虑质量属性间的冲突和权衡（tradeoffs）**，关注点包括：

- Modifiability（可修改性）
- Performance（性能）
- Availability（可用性）
- Security（安全性）

### ATAM

**Key Idea 核心思想**

ATAM is not about precise metrics — **it is about identifying architectural risks, trade-offs, sensitivity points, and non-risks**.

- **Risk**：潜在导致失败的架构决策
- **Trade-off**：一个设计影响多个质量属性
- **Sensitivity point**：架构中某处对某一质量属性影响显著
- **Non-risk**：经过分析认为是安全的架构决策

**好处**

- identified risks
- clarified quality attribute requirement
- improved architecture documentation
- documented basis for architectural decisons
- increased communication among stakeholders

____

**ATAM Evaluation Process 四阶段流程**

| 阶段        | 内容           | 重点说明                           |
| ----------- | -------------- | ---------------------------------- |
| **Phase 0** | 准备阶段       | 与客户达成评估意向，组建评估小组   |
| **Phase 1** | 技术分析       | 架构信息收集、效用树构建、风险识别 |
| **Phase 2** | 利益相关者参与 | 脑暴新场景、验证分析结果           |
| **Phase 3** | 报告总结       | 输出最终报告，提出建议与风险总结   |

**ATAM Phase 1 Details 技术分析阶段**

 Step 1: Present ATAM

> 向客户介绍 ATAM 流程、概念，如 utility tree、scenario mapping。

Step 2: Business drivers

> 客户描述业务驱动、高层功能与质量需求。

 Step 3: Architecture overview

> 架构师介绍系统设计、约束条件、交互系统等。

Step 4: Identify architectural approaches

> 识别使用的核心架构模式（如 Client/Server, Publish-Subscribe 等）。

Step 5: Build a utility tree

- 根节点：Driving Quality Attributes（如性能、可用性、安全等）
- 叶节点：Scenarios，用于评估该属性是否满足要求

> Utility Tree 是优先级分析和属性冲突的核心载体。

Step 6: Analyze scenarios & identify risks

- 针对每个高优先级场景，分析架构如何支撑，并识别：
  - Risks（可能存在的问题）
  - Sensitivity points（影响特定属性的点）
  - Tradeoffs（质量属性之间的取舍）
  - Non-risks（不成问题的决策）

**ATAM Phase 2: Stakeholder Interaction 利益相关者阶段**

- Stakeholders brainstorm new scenarios↳
- 对第 1 阶段结果进行验证（Validate utility tree & risks）

输出内容包括：

- New scenarios↳
- New/verified risks and non-risks↳
- Confirmed tradeoff/sensitivity points



---

后面省略不学了。

