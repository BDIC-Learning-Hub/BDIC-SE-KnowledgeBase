# Style

<img src="/Users/dyxinyal/Library/Application Support/typora-user-images/image-20250525220023516.png" alt="image-20250525220023516" style="zoom:80%;" />

## Data Flow style

| Content      | Details                                                      | 中文翻译                                                     |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| What is it?  | **Definition**:  the availability of data controls the computation<br />**Characteristics**: structure designed by **orderly motion of data** from process to process; no other interaction between processes | 数据的可用性控制计算过程；结构由数据在各处理环节之间的**有序移动决定**；在纯数据流系统中，各处理环节之间除了数据交换之外无其他交互 |
| Models       | **Component**: Data processing components. Input ports read data; output ports write data.<br />**Connecters:**onnectors are data flow (stream), usually unidirectional, asynchronous, and buffered.<br />**Constraints: **Reader and Writer<br />Patterns: Free Linear Cyclic | 数据处理组件。输入端口读取数据，输出端口写出数据; 连接器为数据流（流式），通常为单向、异步并带缓冲区; 接口角色包括读取者和写入者 |
| Suitable for |                                                              |                                                              |
| Context      |                                                              |                                                              |
| Ad & Dis     |                                                              |                                                              |

### 1. Pipe-and-Filter Architecture Style 

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: A pipe-and-filter architecture consists of components called **filters** and connectors called **pipes**. Each filter processes its input data and generates output that is passed via pipes to subsequent filters. **Characteristics**: Filters are independent, and data flows in a linear or branching fashion through pipes. | 管道-过滤器架构由称为“过滤器”的组件和称为“管道”的连接器组成。每个过滤器对其输入数据进行处理，并通过管道将输出传递给下一个过滤器。过滤器是独立的，数据以线性或分支方式在管道中流动。 |
| **Models**       | **Components**: Filters — independent units of computation with inputs and outputs. <br />**Connectors**: Pipes — unidirectional data channels between filters. <br />**Constraints**: Filters do not share state; communication is only via pipes. <br />**Patterns**: Linear sequences, trees, or even loops of filters. | **组件**：过滤器——具有输入和输出的独立计算单元。 <br />**连接器**：管道——过滤器之间的单向数据通道。<br /> **约束**：过滤器之间不共享状态，通信仅通过管道进行。 <br />**模式**：过滤器可形成线性序列、树状结构甚至循环结构。 |
| **Suitable for** | Systems that process data in a series of transformations, such as compilers, signal processing systems, and batch data processing applications. | 适用于以一系列转换步骤处理数据的系统，例如编译器、信号处理系统和批量数据处理应用。 |
| **Context**      | When the processing can be divided into discrete steps with well-defined inputs and outputs, and the overall process benefits from a clear separation of concerns and reusability of components. | 当处理过程可以分为具有明确定义输入输出的离散步骤，且整个过程从关注点分离和组件可重用中获益时适用。 |
| **Ad & Dis**     | **Advantages:**<br />High cohesion<br />Low coupling.<br />Reusability<br />Simple to implement<br />Extendibility and flexibility<br />**DisAdvantages:**<br />Not suitable for interactive applications.<br />High overhead from parsing/format conversion.<br />Low efficiency when large amounts of shared data are needed. |                                                              |

#### Data Processing Transformations in Filters：

| 类型        | 英文原文                               | 中文翻译               |
| ----------- | -------------------------------------- | ---------------------- |
| **Enrich**  | Add information                        | 增加信息以丰富数据     |
| **Reduce**  | Eliminate or summarize data            | 删除或精简数据         |
| **Merge**   | Combine multiple data streams into one | 合并多个数据流         |
| **Split**   | Break one stream into multiple parts   | 将一个数据流拆分为多个 |
| **Convert** | Change representation                  | 改变数据表示方式       |

### 2. Batch Sequential Architecture Style 

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: Computation is performed in separate steps; the output of one step is used as input for the next. **Characteristic**: The components run sequentially, and they communicate by passing files (or data) between steps. | **定义**：计算过程被分为多个独立步骤，每一步的输出作为下一步的输入。 **特点**：组件按顺序运行，借由文件（或数据）传递进行通信。 |
| **Models**       | **Component**: Each step is an independent processing unit that reads input files and writes output files. **Connector**: Files or persistent storage used between components. **Constraints**: Strict sequential order. | **组件**：每个步骤是独立的处理单元，读取输入文件并写入输出文件。 **连接器**：组件间通过文件或持久存储进行连接。 **约束**：严格的顺序执行。 |
| **Suitable for** | Large-scale data processing jobs that do not require user interaction, such as payroll systems, ETL jobs, log analysis. | 适用于不需要用户交互的大规模数据处理任务，如工资系统、ETL流程、日志分析等。 |
| **Context**      | When data can be divided into batches and processed one step at a time with intermediate results stored externally. | 当数据可以分批处理，并且每步处理的中间结果可外部存储时适用。 |
| **Ad & Dis**     | **Advantages** (implicit): - Clear modular separation of processing steps. - Easy to audit and debug using intermediate files.  **Disadvantages**: - No support for interactive or real-time processing. - High latency between steps. | **优点**（隐含）: - 处理步骤清晰模块化。 - 使用中间文件便于审计与调试。  **缺点**： - 不支持交互或实时处理。 - 步骤间延迟较高。 |

### 3. Batch Sequential vs Pipe-and-Filter

<img src="/Users/dyxinyal/Library/Application Support/typora-user-images/image-20250531141657071.png" alt="image-20250531141657071" style="zoom:50%;" />

## Event Systems Style

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: Events are actions that activate the functionality of an object. When an event occurs, a message is sent to the object involved, and the object can perform the corresponding function. When an event occurs to an object, the object finds a corresponding program that handles the event to handle the event. **Control structure**: event-based, one-way data flow. | **定义**：事件是激活对象功能的动作。当事件发生时，系统发送消息给对象，对象执行相应功能。对象通过寻找相应的事件处理程序来处理事件。 **控制结构**：事件驱动，单向数据流。 |
| **Models**       | **Component**: Event Source, Event Handler, Event Manager. **Connector**: Events, messages, or publish-subscribe channels. **Control**: Triggered behavior, event registration and callback execution. Event publisher is unaware of the subscribers. One-to-many communication via publish/subscribe model. Can be implemented with dispatcher module (selected or full broadcasting) or queue-based point-to-point system. | **组件**：事件源（Event Source）、事件处理器（Event Handler）、事件管理器（Event Manager）。 **连接器**：事件、消息或发布-订阅通道。 **控制方式**：通过事件触发行为，使用注册机制和回调函数执行处理。 发布者不知道订阅者的存在；通过发布-订阅实现一对多通信；可通过广播或队列方式实现事件分发。 |
| **Suitable for** | GUI systems, distributed monitoring systems, reactive IoT applications, asynchronous message handling, loosely coupled systems. | 图形用户界面系统、分布式监控系统、响应式物联网应用、异步消息处理、松耦合系统等。 |
| **Context**      | When asynchronous communication is needed, and components should remain decoupled. Event systems are ideal when components may be dynamically added/removed or react independently to system state changes. | 适用于需要异步通信并希望组件之间解耦的场景。特别适用于组件需动态添加/移除，或根据系统状态变化独立反应的系统架构。 |
| **Ad & Dis**     | **Advantages**: - The event manager and the event handlers are separate, providing decoupled and individual functionalities. - The replacement and additions are independent and thus easier to perform. - Any manager or handler malfunction will not affect the other managers and handlers. - High reuse potential.  **Disadvantages**: - Difficult for dispatcher to react to many inputs in time. - Dispatcher malfunction can bring down the system. - Dispatcher is performance bottleneck. - No guarantee that an event will be treated. | **优点**： - 事件管理器与事件处理器分离，解耦独立。 - 更换和新增组件简单易行。 - 某个管理器或处理器故障不会影响其他部分。 - 具有较高的复用性。  **缺点**： - 派遣器难以及时响应多个输入。 - 派遣器故障可能导致系统崩溃。 - 派遣器是系统性能瓶颈。 - 无法保证事件一定会被处理。 |

#### Dispatch Mechanism of Event Systems

| **Mechanism Type**                  | **Original Description**                                     | **中文翻译**                                                 |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **1. Without dispatcher module**    | Each module sends events directly to registered listeners (Observable/Observer pattern). | 每个模块将事件直接发送给已注册的监听者（观察者模式）。       |
| **2. With dispatcher module**       | - **All broadcasting**: all modules receive the event, but only the interested ones react. - **Selected broadcasting**: only the registered modules receive events. | - **全广播**：所有模块接收事件，只有感兴趣的模块响应。 - **选择性广播**：仅已注册的模块接收事件。 |
| **3. Point-to-point (queue-based)** | Events are stored in a message queue until fetched by the consumer. | 事件存储在消息队列中，直到消费者将其提取并处理。             |
| **4. Publish-Subscribe**            | Multiple subscribers can consume the same event.             | 多个订阅者可以同时消费一个事件。                             |

## Call/Return System

| 原文                                                         | 中文翻译                                         |
| ------------------------------------------------------------ | ------------------------------------------------ |
| Classic programming paradigm: functional decomposition.      | 经典编程范式：功能分解。                         |
| Each layer can only communicate with its immediate neighbors. | 每一层只能与相邻的上下层通信。                   |
| Methods (dynamic binding), polymorphism (subclassing), reuse (inheritance). | 方法（动态绑定）、多态（子类化）、复用（继承）。 |

### 1. Main Program & Subroutine（主程序与子程序）

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: A simple hierarchical organization where a **main program** controls overall flow and delegates specific tasks to **subroutines**. | 定义：一种简单的层次结构，由**主程序**控制整体流程，并将特定任务委托给**子程序**完成。 |
| **Models**       | **System model**: Tree-like structure with one main program at the root and subroutines as leaves. **Components**: Procedures (routines).**Connectors**: Call-return links.**Control structure**: Single thread, top-down invocation. | 系统模型：类似树状结构，根为主程序，叶子为子程序。组件：过程（例程）。连接器：调用-返回链接。控制结构：单线程，自顶向下调用。 |
| **Suitable for** | Small to medium systems with centralized control and limited complexity. | 适用于具有**集中控制**和**低复杂度**的小型到中型系统。       |
| **Context**      | Typically used in traditional programming languages like C, Pascal. | 通常用于传统编程语言，如 C、Pascal。                         |
| **Ad & Dis**     | **Advantages**: Simple and easy to implement; clear and predictable control flow.**Disadvantages**: Not suitable for highly interactive or distributed systems; poor scalability. | **优点**：简单且易于实现；控制流清晰且可预测。**缺点**：不适合高度交互或分布式系统；可扩展性差。 |

### 2. OOP

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: A variant of the call/return style. System organized as a set of objects, each encapsulating its own data and behavior.<br />Characteristics: Encapsulation, Polymorphism, Inheritance, Reuse & Maintenance | 定义：Call/Return 风格的一种变体。系统被组织为一组对象，每个对象封装其自己的数据和行为。 |
| **Models**       | **System model**: Each object is a package of data and procedures operating on the data. Objects are instances of classes.**Connectors**: Method invocations, usually via message passing.**Control structure**: Call/return between objects. | 系统模型：每个对象是封装了操作其数据的过程的单元，对象是类的实例。连接器：方法调用，通常是通过消息传递实现。控制结构：对象间的调用-返回机制。 |
| **Suitable for** | This pattern is suitable for applications in which a central issue is **identifying and protecting related bodies of information**, especially representation information. | 适用于需要识别和保护相关信息，特别是表示信息的程序。         |
| **Context**      | Numerous design methods provide strategies for identifying natural objects. Newer programming languages support various variations on the theme, so if the language choice or the methodol- ogy is fixed, that will strongly influence the flavor of the decompo- sition. | 许多设计方法提供了识别自然对象的策略。较新的编程语言支持这一主题的各种变体，因此如果语言选择或方法论已确定，这将对分解的风格产生重大影响。 |
| **Ad & Dis**     | **Advantages**: Promotes reuse via inheritance; supports information hiding; enables flexible behavior via polymorphism.<br />**Disadvantages**: Indirection may affect performance; dynamic control flow may be hard to trace in large systems. | **优点**：通过继承促进复用；支持信息隐藏；多态性使行为更灵活。**缺点**：间接性可能影响性能；在大型系统中动态控制流难以追踪。 |

**Problem**:

| 英文原文                                                     | 中文注释                                        |
| ------------------------------------------------------------ | ----------------------------------------------- |
| **Managing many objects**                                    | **管理大量对象**                                |
| Vast sea of objects requires additional structuring          | 大量对象需要进一步结构化组织                    |
| Hierarchical design suggested by Booch and Parnas            | Booch 和 Parnas 建议采用分层设计                |
| **Managing many interactions**                               | **管理大量交互**                                |
| Single interface can be limiting & unwieldy (hence, “friends”) | 单一接口可能受限且难用（因此引入 “friends”）    |
| Some languages/systems permit multiple interfaces (inner class, interface, multiple inheritances) | 有些语言/系统允许多接口（内部类、接口、多继承） |
| **Distributed responsibility for behavior**                  | **行为责任分布过广**                            |
| Makes system hard to understand                              | 系统难以理解                                    |
| Interaction diagrams now used in the design                  | 因此需要引入交互图辅助设计                      |

| 英文原文                                                     | 中文注释                                |
| ------------------------------------------------------------ | --------------------------------------- |
| **Capturing families of related designs**                    | **表示相关设计族**                      |
| Types/classes are often not enough                           | 类型/类不足以表达设计共性               |
| Design patterns as an emerging off-shoot                     | 设计模式应运而生以补充表达能力          |
| **Pure O-O design leads to large flat systems with many objects** | **纯 OOP 设计可能导致扁平且臃肿的系统** |
| Same old problems can reappear                               | 旧问题可能重现                          |
| Hundreds of modules -> hard to find things                   | 模块数百，难以定位管理                  |
| Need a way to impose structure                               | 需要结构化手段加以组织                  |
| **Need additional structure and discipline**                 | **需要额外结构与设计规范*               |

### 3. Layered System Style

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: A system is organized into a set of layers, each layer provides services to the layer above it and uses services of the layer below. | 定义：系统被组织为若干层，每一层向其上层提供服务，并使用其下层的服务。 |
| **Models**       | **System model**: hierarchy of opaque layers <br />**Components**: composites (usually collections of procedures) <br />**Connectors:** restricted visibility procedure calls or client/server<br />**Control:** single thread | 系统模型：不透明层的层级结构 组件：复合体（通常是过程集合） 连接件：受限可见性的过程调用或客户端/服务器 控制：单线程 |
| **Suitable for** | Systems that require incremental development and maintenance, separation of concerns, or portability (e.g. OSI network model, operating systems). | 适用于需要渐进式开发与维护、关注点分离或可移植性的系统（如 OSI 网络模型、操作系统等）。 |
| **Context**      | Used in designing operating systems, communication systems, and large-scale enterprise applications. | 常用于操作系统、通信系统以及大型企业应用的设计中。           |
| **Ad & Dis**     | **Advantages**: <br />Each layer is selected to be a set of related services.<br />Each layer may hide private information from other layers. <br />Layers may use only lower layers, constraining the amount of coupling. Easy to add and/or modify a current layer.<br />Each layer, being cohesive and coupled only to lower layers. Changes in a layer affect at most the adjacent two layers.<br />**Disadvantages**: <br />May lead to performance overhead due to layer traversal; <br />strict layering can reduce flexibility; <br />Not always easy to structure in clean layers. | **优点**：每层都是一组相关服务;每层可隐藏私有信息;各层只能使用其下层，从而限制了耦合程度;易于添加或修改当前层；每一层都具有内聚性，并且仅与下层耦合变更仅影响相邻的两层 **缺点**：层间访问导致性能开销；严格分层降低灵活性；不总是能清晰分层 |

### 4. Client-Server

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: A system is structured as a set of services, that is, servers, and a set of clients that invoke those services.<br />**Characteristics: **Client depends on the server; One or more clients may be connected to a server; Easily supports client mobility; Typically controlled at the server, also possible at application/business laye | 定义：系统被结构化为一组服务（即服务器）和一组调用这些服务的客户端。<br />特征：客户端依赖服务器；一个或多个客户端连接一个服务器，客户端的移动性；安全机制由服务器或应用/业务层处理 |
| **Models**       | **System model**: Two main types of components — clients and servers. **Components**: Clients initiate requests; servers respond to them and manage resources. **Connectors**: Network protocols (e.g., HTTP, TCP); **RPC-based network interaction protocols** (Remote Procedure Call). **Control structure**: Request-response pattern. | 系统模型：两种主要组件——客户端和服务器。 组件：客户端发起请求；服务器响应并管理资源。 连接器：网络协议（如 HTTP，TCP）。 控制结构：请求-响应模式。 |
| **Suitable for** | Distributed systems, web applications, multi-user networked systems. | 适用于分布式系统、Web 应用程序、多用户网络系统。             |
| **Context**      | Widely used in Internet-based services, enterprise software, and cloud computing systems. | 广泛应用于基于互联网的服务、企业级软件和云计算系统中。       |

**Ad**

| 原文                                                 | 中文翻译                 |
| ---------------------------------------------------- | ------------------------ |
| Makes effective use of network systems.              | 有效利用网络系统。       |
| Easy to add new servers or upgrade existing servers. | 易于添加或升级服务器。   |
| Allows sharing of data between multiple users.       | 允许多用户数据共享。     |
| Scalable: add new clients.                           | 可扩展：可增加新客户端。 |

**Dis**

| 原文                                                      | 中文翻译                       |
| --------------------------------------------------------- | ------------------------------ |
| Redundant management in each server.                      | 每个服务器有冗余管理任务。     |
| No central register of names and services.                | 无中央服务注册机制。           |
| Difficult to change functionalities of server and client. | 客户端与服务器功能难以变更。   |
| Scalability is limited by server & network capacity.      | 扩展性受限于服务器与网络能力。 |

## Data-centered Style

**Data-centered Style**：Data-centered architecture involves a shared data source approach for information delivery.

### 1. Repository Style

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: A repository is a central place where data is stored and maintained.<br />**Characteristics**: It includes a central data structure representing the current state, and a collection of independent components that operate on the central data store. | **定义**：存储库是存储和维护数据的中心位置。<br />**特征**：包括表示当前状态的中心数据结构，以及一组对该数据结构进行操作的独立组件。 |
| **Models**       | **Component**: Central data structure + Independent components.<br />**Connector**: Interactions between the repository and its external components.<br />**Mechanisms**:**Database** – Transactions in an input stream trigger selection of process to execute.• **Blackboard** – Current state of central data triggers process selection. | **组件**：中心数据结构 + 独立组件。**连接器**：存储库与外部组件之间的交互。**机制**：• **数据库模型**：输入流中的事务触发相应的处理过程。• **黑板模型**：中央数据的当前状态触发过程选择。 |
| **Suitable for** | Applications in which the central issue is establishing, augmenting, and maintaining a complex central body of information. | 适用于核心任务是构建、扩展和维护复杂信息主体的应用程序。     |
| **Context**      | Examples:• Data processing, especially for business decision systems from conventional databases.• Software development environments, where programs and designs are manipulated. | 典型场景：• 数据处理，尤其是基于传统数据库的商业决策系统；• 软件开发环境，用于程序与设计的操作与管理。 |
| **Ad & Dis**     | **Advantages**: Centralization of data, modularity of components, supports integration and reuse.**Disadvantages**: Potential performance bottleneck at the repository, high dependency on central structure, complex data management. | **优点**：数据集中管理；组件模块化；支持集成与复用。**缺点**：可能出现性能瓶颈；高度依赖中心结构；数据管理复杂。 |

### 2. Blackboard Style

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: The central data structure is actively interpreted and modified by a diverse set of knowledge sources, triggered by changes in the data itself. | **定义**：中中央数据结构被多个知识源动态地解释和修改，这些知识源的行为是由数据自身的变化所触发的。 |
| **Models**       | **Component**: Knowledge Sources (KS), Blackboard.<br />**Connector**: Control shell that coordinates the KS.<br />**Control**: Triggered by changes in the blackboard's data state; KSs respond based on pattern recognition and contribution condition. | **组件**：知识源（Knowledge Sources）、黑板。**连接器**：控制壳（Control Shell）协调各知识源的工作。**控制**：由黑板数据状态的变化触发；知识源根据模式匹配与适用条件作出响应。 |
| **Suitable for** | Applications with no deterministic solution strategy, or where reasoning from multiple expert knowledge sources is required. | 适用于无确定性解法策略的应用场景，或需要从多个专家知识源中进行推理的问题。 |
| **Context**      | Examples:• Speech recognition• Vehicle tracking systems• Integrated software tools• Real-time situational interpretation | 示例：• 语音识别• 车辆追踪系统• 集成软件工具• 实时情境解释   |
| **Ad & Dis**     | **Advantages**: Flexibility to add new knowledge sources; good for solving complex, ill-defined problems.**Disadvantages**: Often requires elaborate control mechanism; high development cost and performance overhead. | **优点**：易于扩展新的知识源；适合处理复杂和难以定义的问题。**缺点**：通常需要复杂的控制机制；开发成本高，性能开销大。 |

## Virtual Machine

### 1. Interpreter Style

| **Content**      | **Details**                                                  | **中文翻译**                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | **Definition**: The availability of data controls the computation. Interpreters are sometimes used in chains, translating from the desired language/machine to an available one in a series of stages. | **定义**：数据的可用性控制计算过程。解释器有时以链式结构，逐步将目标语言/机器转换为可用语言/机器。 |
| **Models**       | **System model**: virtual machine.**Components**: one state machine (execution engine) and three memories: current state of execution engine, program being interpreted, current state of program being interpreted.**Connectors**: data access and procedure call.**Control structure**: state-transition + input-driven selection. | **系统模型**：虚拟机。**组件**：一个状态机（执行引擎）和三类内存：执行引擎当前状态、被解释程序、程序当前状态。**连接器**：数据访问和过程调用。**控制结构**：状态转移 + 输入驱动选择。 |
| **Suitable for** | Applications where the most appropriate language or machine for executing the solution is not directly available; also suitable for defining domain-specific languages or scripting environments. | 适用于目标语言或执行环境不可用的情况，也适合用于定义领域特定语言或脚本环境。 |
| **Context**      | Examples:• Scripting languages (VBScript, JavaScript)• HTML rendering• Java bytecode execution• Matlab• Configuration file parsing | 示例：• 脚本语言（如 VBScript, JavaScript）• HTML 渲染• Java 字节码执行• Matlab• 配置文件解析 |
| **Ad & Dis**     | **Advantages**: Can simulate non-native functionality; very general-purpose tool; can simulate “disaster” modes for safety-critical applications.**Disadvantages**: Much slower than hardware or compiled execution; adds software verification complexity. | **优点**：可模拟非原生功能；是非常通用的工具；可用于关键安全系统中的灾难模式模拟。**缺点**：远慢于硬件或编译执行；增加了解释层验证的复杂度。 |

### 2. Rule-based System

| Content          | Details                                                      | 中文翻译                                                     |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **What is it?**  | Definition: Rule-based systems use an inference engine to match facts and rules, triggering actions when conditions are met. A rule-based interpreter includes: the knowledge base (code to be executed), the interpretation engine (rule interpreter), and the control state of the interpreter. | 定义：基于规则的系统使用推理引擎将事实与规则匹配，当满足条件时触发操作。一个基于规则的解释器包括：知识库（要执行的代码）、解释引擎（规则解释器）、解释器的控制状态。 |
| **Models**       | Components: knowledge base, rule interpreter, current state (working memory).  Connectors: rule/data selection and knowledge base interaction. | 组件：知识库、规则解释器、当前状态（工作内存）。连接器：规则/数据选择和知识库交互。 |
| **Suitable for** | Applications that need to process a set of rules to solve problems, such as expert systems or business rule engines. | 适用于需要处理规则集合以解决问题的应用，如专家系统或业务规则引擎。 |
| **Context**      | Examples:  • Business logic automation  • Decision-making systems  • Domains with well-defined rules and structured conditions | 示例：• 业务逻辑自动化• 决策系统• 拥有明确定义规则和结构化条件的领域 |
| **Ad & Dis**     | Advantages: Declarative programming; centralized knowledge base; logic and data separation; fast and flexible; good explanation mechanisms and tool support.  Disadvantages: Can become inefficient with large rule sets; complex to manage; slow in real-time applications. | 优点：声明式编程；集中式知识库；逻辑与数据分离；快速灵活；良好的解释机制和工具支持。缺点：规则多时效率低下；管理复杂；不适用于实时应用。 |

### 3.Drools

| Content      | Details                                                      | 中文翻译                                                     |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| What is it?  | Definition: Drools is a business rule management system (BRMS) with a forward and backward chaining inference-based rules engine, more specifically known as a production rule system, using an enhanced implementation of the Rete algorithm. | 定义：Drools 是一个商业规则管理系统（BRMS），具备前向与后向链式推理机制的规则引擎，属于生产规则系统，基于改进的 Rete 算法实现。 |
| Models       | Components: • Rule base (set of rules in DRL) • Working memory (holds facts) • Inference engine (matches facts to rules using Rete algorithm)  Execution via Agenda, Fact insertion, Rule firing. | 组件：• 规则库（以 DRL 编写的规则集合）• 工作内存（保存事实）• 推理引擎（使用 Rete 算法将事实与规则匹配）执行机制：议程、事实插入、规则触发。 |
| Suitable for | Complex decision-making systems requiring dynamic, data-driven logic. Well-suited to domains such as fraud detection, pricing engines, eligibility systems, and compliance validation. | 适用于需要动态数据驱动逻辑的复杂决策系统，如欺诈检测、定价引擎、资格判断系统和合规校验等。 |
| Context      | Frequently integrated into enterprise Java applications; allows business analysts to update rule logic without modifying core application code. | 常集成于企业 Java 应用中；允许业务分析师无需修改主程序代码即可更新规则逻辑。 |
| Ad & Dis     | Advantages: • Separation of rules from application code • Reusability and maintainability • Strong support for complex rule chaining and inference  Disadvantages: • Learning curve for DRL and Rete • Performance drops with large fact base | 优点：• 规则与应用代码分离• 可重用性与可维护性高• 强大的规则链与推理支持缺点：• 学习 DRL 和 Rete 有一定门槛• 事实库庞大时性能下降 |