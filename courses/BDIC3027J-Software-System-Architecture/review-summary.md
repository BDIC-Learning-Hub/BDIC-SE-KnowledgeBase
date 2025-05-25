# 软件体系架构知识复习

> 课程编码：
>
> 授课教师：
>
> 考核方式：

## Lseeson21: Data Flow Architectural Style(Data Flow Style)

### What is Software Architectural Style?

> Architectural Style 是一种架构分类方法，主要依据架构的**形式（form）、技术（techniques）、材料（materials）等形态特征**。

- 在本课中，它指的是**一类常见的、被实践证明有效的体系结构模式**，具备良好的可复用性与可扩展性。

**软件体系结构风格（Software Architectural Style）具有以下特点：**

1. **描述的是一类架构，而非某一个具体系统**

- It describes a **class of architectures** that appear repeatedly in practice.↳

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

📌 定义

> Call/Return 风格是一类以**明确过程调用（call）和返回（return）**为基础的体系结构风格，强调主程序对子程序、对象、层级等的调用控制。

该风格包括以下几种典型子风格：

| 风格              | 英文术语                  | 简述                       |
| ----------------- | ------------------------- | -------------------------- |
| 主程序-子程序风格 | Main Program & Subroutine | 单线程、层级调用结构       |
| 面向对象风格      | Object Oriented Style     | 以封装、继承、多态为核心   |
| 分层风格          | Layered System Style      | 模块按层划分，上层调用下层 |
| 客户端-服务器风格 | Client/Server Style       | 基于网络的调用请求结构     |

### Main Program & Subroutine Style 主程序与子程序风格

🎯 适用问题（Problem）

适用于**可分解为过程调用层级的应用程序**，例如排序、搜索、数值分析等。

📎 上下文（Context）

大多数过程式编程语言（如 C, Pascal）天然支持此结构：支持过程嵌套、命名空间、模块化、单线程控制等。

💡 解决方案（Solution）

| 构成项            | 内容                                                    |
| ----------------- | ------------------------------------------------------- |
| System Model      | 调用层次结构（Call & Definition Hierarchy）             |
| Components        | 过程（Procedures）和显式数据（Explicitly visible data） |
| Connectors        | 过程调用与数据共享                                      |
| Control Structure | 单线程执行（Single thread of control）                  |



------

🔍 模块分解策略（Parnas 模块化建议）

| 原则                                    | 说明                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| Hide secrets                            | 屏蔽变化点，如Representation of data、Properties of a device、Mechanisms that support policies |
| Localize future changes                 | 将未来可能变化的部分隔离到模块中                             |
| Use interfaces                          | 接口中只暴露不易变化的假设                                   |
| Prefer function call over data exposure | 提倡通过函数暴露能力而非直接数据结构                         |

### Object-Oriented Style 面向对象风格

🎯 Problem

当软件系统的核心是**管理与封装数据及其行为**时，OO风格是最适合的结构。

📎 Context

- 面向对象语言（如 Java、C++、Python）支持对象封装、继承、多态等特性，天然契合此风格。
- 同时有大量设计方法（如 UML、领域建模）支撑对象识别与设计。

💡 Solution

| 构成项            | 内容                                              |
| ----------------- | ------------------------------------------------- |
| System Model      | 本地状态维护（Localized state maintenance）       |
| Components        | 对象（Objects）、管理器（Managers）、抽象数据类型 |
| Connectors        | 方法调用（Procedure Call）                        |
| Control Structure | 去中心化，通常为单线程（Decentralized）           |

🔑特性（Characteristics）

| 特性       | 英文术语              | 中文说明                   |
| ---------- | --------------------- | -------------------------- |
| 封装       | Encapsulation         | 限制状态访问，隐藏内部信息 |
| 多态       | Polymorphism          | 运行时选择不同实现         |
| 继承       | Inheritance           | 功能继承，接口共享         |
| 交互       | Interaction           | 通过方法调用或协议         |
| 复用与维护 | Reuse and Maintenance | 通过模块化与封装提升生产力 |

❗Problems of Object Oriented

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

**🎯 Problem **

- 适用于**服务层次分明、职责清晰**的系统，如操作系统、网络协议栈、Web 应用结构。
- 系统服务可以自然划分为多个层级，例如：
  - 底层为系统服务（如文件系统、网络）
  - 中间为通用功能层（如数据库访问）
  - 顶层为具体应用逻辑（如用户界面）

🌐 Context（上下文）

- 高层设计阶段中经常使用分层思想
- 每一层服务类任务被归为一组
- 可以结合不同架构模式来细化每层

💡 Solution（解决方案）

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

> **Client/Server architecture** is a style where components are divided into clients and servers. The client initiates requests, and the server processes and returns responses.↳

即：将系统划分为两个角色：

- **Client（客户端）**：发起请求、处理用户输入/输出
- **Server（服务器）**：响应请求，执行处理逻辑

这是一种**资源不对等结构（asymmetric interaction）**，客户端依赖服务器。

🎯 Application Context（适用场景）

- **适用于网络环境下的分布式系统**，如企业管理系统、数据库系统、Web 应用等。
- 多用户共享资源（如数据库、文件、打印机）或分布式任务处理。

🧩 Structural Elements（结构组成）

| 元素                 | 英文术语                              | 描述                               |
| -------------------- | ------------------------------------- | ---------------------------------- |
| 构件（Components）   | Clients and Servers                   | 客户端发起请求，服务器响应         |
| 连接器（Connectors） | RPC (Remote Procedure Call) protocols | 客户端通过网络远程调用服务器功能   |
| 拓扑结构（Topology） | 1-to-N (One server, multiple clients) | 客户端间无直接通信，仅与服务器交互 |

------

🧱 Characteristics（特征）

| 特征                         | 英文术语                           | 解释 |
| ---------------------------- | ---------------------------------- | ---- |
| client depends on the server | 非对称通信，客户端主动，服务器被动 |      |
| One-to-many topology         | 多客户端对一服务器                 |      |
| Client mobility              | 支持客户端在不同地点接入           |      |
| Server-side security         | 通常服务器进行统一访问控制         |      |
| Distributed deployment       | 支持将功能模块分布于不同节点       |      |

> “The server is unaware of the clients. The client knows and calls the server.”

------

✅ Advantages of Client/Server Style（PPT p33）

| 优势编号 | 英文描述                       | 中文解释                                    |
| -------- | ------------------------------ | ------------------------------------------- |
| 1        | Efficient network utilization  | 高效利用网络与系统资源                      |
| 2        | Easy to scale / upgrade server | 易于升级服务器功能                          |
| 3        | Resource sharing               | 支持多用户共享资源                          |
| 4        | Scalability by adding clients  | 客户端可动态添加，实现扩展性（scalability） |



------

 🟥 Disadvantages of Client/Server Style

| 问题编号 | 英文描述                                | 中文解释                                   |
| -------- | --------------------------------------- | ------------------------------------------ |
| 1        | Redundant management in servers         | 各服务器需重复管理，冗余工作               |
| 2        | No central registry of services         | 无法集中查询服务状态，缺少服务发现机制     |
| 3        | hard to modify                          | 应用逻辑分布在客户端和服务器，**难以更改** |
| 4        | Scalability limited by server & network | 可扩展性受限于服务器能力与网络带宽         |



------

**✅ Two-Tier vs Three-Tier Architecture（二层与三层结构）**

🟦 Two-Tier（厚客户端 Thick Client）

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

🟩 Three-Tier（三层架构 Thin Client）

| 层级   | 英文名称          | 功能                         |
| ------ | ----------------- | ---------------------------- |
| Tier 1 | Presentation Tier | 用户界面层，部署在客户端     |
| Tier 2 | Application Tier  | 应用逻辑层，部署在中间服务器 |
| Tier 3 | Data Tier         | 数据层，管理数据库资源       |



- 各层**逻辑上独立**，可分别部署与维护
- 常见于 Web 应用结构

------

### 🌐 B/S 架构（Browser/Server）

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

**适用问题特征**

- 无法提前定义明确的处理流程
- 可能存在多个中间解、多个解法路径
- 问题需要跨多个领域的知识源协作求解
- 举例场景：自然语言处理、图像识别、模式识别等 AI 系统

**核心结构组成（Structure）**

| 组成部分 | 英文术语          | 功能                                     |
| -------- | ----------------- | ---------------------------------------- |
| 黑板     | Blackboard        | 全局共享数据空间，存储当前求解状态       |
| 知识源   | Knowledge Sources | 独立的求解程序，仅通过黑板通信           |
| 控制器   | Controller        | 监视黑板状态，决定哪个知识源可被激活执行 |

**Blackboard 特征总结**

| 特征                         | 说明                                        |
| ---------------------------- | ------------------------------------------- |
| Global shared memory         | 所有组件共享对黑板的访问权限                |
| Incremental update           | 解是通过状态逐步演化获得的                  |
| Condition-action rule        | 知识源以“当条件满足 → 执行动作”的形式被激活 |
| Asynchronous & collaborative | 各知识源异步工作，互不调用，仅通过黑板通信  |
| Dynamic control              | 控制器动态决定求解流程，非静态流程图        |
