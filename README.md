# ***<span style="color:#FFC800">Email</span><span style="color:#1B268F">Service</span>***
## Table of Contents
- [Setup](#Setup)
- [Design Patterns and UML Class Diagram](#Design-Patterns-and-UML-Class-Diagram)
    - [Table of Used Design Patterns](#Table-of-Used-Design-Patterns)
    - [Design Patterns Explaination](#Design-Patterns-Explaination)
    - [UML Class Diagram](#UML-Class-Diagram)
- [Design Decisions](#Design-Decisions)
- [Features](#Features)
## Setup
> - First of all: you must install the `Front-End` folder, using npm install just because node modules may be missing. 
> - Secondly: Spring Boot folder is straight forward just open the pom file using any IDE.
> - Thirdly: you run the Angular project and on localhost:4200 and the Spring Boot project on localhost:8080.
## Design Patterns and UML Class Diagram
### Table of Used Design Patterns
|        **Design Patterns**        |
| :-------------------------------: |
|        `Singelton Pattern`        |
|         `Builder Pattern`         |
|          `Filter Pattern`         |
| `Chain of responsibility Pattern` |
|       `null object Pattern`       |
|       `Delegation Pattern`        |
|        `interface Pattern`        |

### Design Patterns Explaination
We used about seven design patterns, and we make sure that we used 
them when we need them, two creational, one structural, two 
behavioral and two fundamentals design patterns as follow:
> + Singleton design pattern used in the Database, filter, searcher,
> creator and deleter to reduce number of objects because those 
> classes are used too much in the design.
> + Builder design pattern used in the process of building the profile 
> data and link them with data containers which is in json schema.
> + Filter design patterns used in filtering emails and contacts based 
> on specific attribute in the email or contact and specific value. It’s
> also used in searching in emails and contacts.
> + Chain of responsibility used to handle specific requests on emails 
> but without any previous knowledge.
> + Interface and Delegation design pattern used in applying the 
> previous design patterns.
## UML Class Diagram
![image](https://drive.google.com/file/d/1yrE3eHK_nPGCbyu7UzTbtd1MgudPkVFr/view?usp=sharing)
+ Link for higher resolution: `https://miro.com/app/board/uXjVOY1Lgd8=/?invite_link_id=126737987619`
## Design Decisions
+ In sorting, we sort only by body, subject, sender, date, priority.
+ Move to trash can only be applied only in the inbox and sent folders.
+ Delete forever can only be applied in the draft and trash folders.
+ Inbox emails only can be copied to user folders.
+ In contacts sorting we sort only by username.
+ When open the inbox folder and choose get emails by priority, refresh button must be clicked
