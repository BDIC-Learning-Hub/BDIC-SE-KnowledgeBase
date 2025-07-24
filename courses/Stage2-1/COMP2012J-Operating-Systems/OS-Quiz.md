---
title: OS Quiz 题目总结
---

# QUIZ 5

*1. What would be the  effect of a  preemptive approach to scheduling  on a hard real-time system like Air Traffic Control ?* 

Absolute deadline that always have to be met. It enable the system to assign high priorities process. Priorities can be adjusted according to situation. But lots of context switching lead to more overhead.

*2. Based on the First come First Served*

*3. Scheduling strategies can achieve four objectives, in your own words what are they ?* 

Policy enforcement: Ensure that system scheduling policy is executed. Fairness and Balance: Make sure no process starved, and similar processes are treated the same. Predictability: Under similar loads, the same processes should run for roughly the same time. Scalability: Elegant performance degradation under heavy loads. 

*4. Based on the priority Queue*

*5. Why is a non-preemptive approach to scheduling used hard real-time system like Air Traffic Control?*

Non-preemptive scheduling provides a deterministic and predictable execution. Once a task start, it continues until completion without interruption. Reduce the overhead.

*6. In Process Scheduling , when a Process is being executed what are the two common states is it normally consider to be in and please describe in your own words what each of those states is. Please write two sentences on both.*

Running: When a process is in running, it is actively being executed by CPU.

Blocked: In the Blocked, the process temporarily unable to proceed.

*7. Based on Shortest Job*

*8. Based on First Come First Served*

*9. Based on Round Robin*

*10. Based on Shortest Time Remaining*

*11. Based on First Come First Served*

*12. Explain some advantages of Priority Scheduling*

Flexibility in Task Priority: Adjust the task according to actual situation, so that execute earlier or later.

Efficient Resource Utilization

# Quiz 7

*Explain the following formula for effective memory access time using Virtual memory ? Te = p x Tf + (1 – p) x Ta*

- T~e~: Effective memory access time.
- P: The probability of finding the desired information in the memory.
- T~f~: Page fault interrupt time.
- T~a~: memory access time

----

*What are the advantages and disadvantages of using FIFO paging swap algorithm ?*

- Easier to implement, but the replacement effect is not good.

---

*In examining real world programs , each line of code , can be examined in terms of how many times it is executed, this divideds the code into two different types, what are they and why do you think this is ?*

- Hot code and cold code.

---

*What is the difference between 32-bit and 64-bit virtual addresses and explain an advantage and disadvantage for using one over the other?*

- They provide different large memory. 32-bit provide 4GB of memory. 64-bit provide 16 EB of memory.
  64-bit: Increased addressable memory, allowing for better performance. But it increased Memory overhead.

