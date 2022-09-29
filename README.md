# EtherTix - Project Proposal

Nowadays, blockchain based web applications are becoming more and more popular. Decentralised applications that are being built on the Ethereum blockchain have more advantages than centralised ones. Users do not have to rely on a centralised and governed authority such as banks or any other intermediaries to verify and approve transactions. Usually because transactions are placed in a pending state which can take a very long time to be approved by banks. Transactions could also potentially fail if they are deemed to be suspicious of malicious activity. However, the main problem is that online transactions are prone to be intercepted by malicious users which can result in fraud. They also come with security flaws when stored in a local database. We propose that as a group, gather the functional requirements, design, develop, test, document and deploy a decentralized Web3 application on the Ethereum blockchain, allowing users to view, search, paginate and sort through popular events in their local area and purchase tickets corresponding to an event. 

Purchasing tickets can be achieved through the implementation of a smart contract. Also, tickets can be bought by directly sending ether currency to the organiser’s web wallet instantaneously. Without involving a middleman to verify and provide the physical ticket(s) upon event entry or by e-mail address. An advantage to this is enhanced data provenance. Thus, every transaction is time stamped and logged inside the blockchain which can be tracked at any point, preventing fraudulent activity and counterfeited tickets. Furthermore, once the organiser receives the payment for the ticket(s) in their wallet, then, a phone call or a message can be sent by the organiser to let the attendee(s) know that the purchase was successful. Users can also view their recently purchased tickets and upcoming events on their profile page. The main reason for going ahead with the proposed development of this application is preventing cheap, very important or expensive tickets from being counterfeited, lost (physically or by e-mail), modified (torn and/or tampered with) stolen by fraud, and/or resold on malicious websites before attending an event as well as proof of ownership. In the context of this application, events can be hosted by organisers at a venue. Meaning, that event data must be initially configured through a secure and protected admin dashboard with strong authentication. Without interference from unauthorized users. Event, Ticket and Venue data can also be modified and deleted according to the organiser. Conventionally, users would pay for tickets using their debit card / credit card, through a PayPal gateway, or other payment provider. However, this application will instead allow users to purchase tickets by paying the event organiser in ether currency. Which most event hosting applications don’t have. And is considered as a gap in the market. Payments can be made by depositing ether to the organisers meta mask wallet address through an API. Thus, storing every order transaction on the blockchain instead of a local database for the payment data. Thus, making every transaction fast, secure, and efficient in terms of cost and CPU / RAM computational resources. Every transaction is cryptographically hashed, making it impossible for the data to be intercepted and hacked. Ultimately making the application extremely secure and fast. 

Furthermore, the initial target audience that this application aims to capture are teenagers between the ages of 13-19, adults (20-40) and elders living in the United Kingdom who are actively looking for events to attend in their local area. Without relying on centralised banks to verify and approve the transactions they make when purchasing the tickets. Moreover, as the project progresses overtime there will be more countries added as to where events can be hosted. In addition to the above, an advantage of developing this application on the Ethereum blockchain is mainly proof of ownership of a digital asset. Ledger immutability, enhanced security, improved efficiency, and data integrity. 

Once a ticket is purchased, the user completely owns this ticket associated to an event because the transaction for the ticket gets stored inside a cryptographic hash in the form of 0x and inserted inside the blockchain ledger. Thus, uniquely identifying the user who purchased it; hence, the ticket cannot be replicated. Therefore, the data cannot be lost since there is a chain of records stored on the blockchain that proves that the transaction has been made through smart contract execution. Hence, making the application very secure and fast. Also, preventing fake tickets from being forged and resold on malicious websites. Thereby, eliminating the risk of the application being hacked by malicious users due to the immutability of the blockchain. Meaning that no transactions can be altered or deleted. The problem that this application is aiming to solve is eliminating time spent waiting on central banks to approve transactions when making a purchase. Instead, giving users full proof of ownership of event tickets as quickly as possible to improve the speed and reliability of the application.

# Authentication Use Case Diagram

First and foremost, one important design methodology that is used to design this system are UML Use Case diagrams. Generally, these diagrams show how the users are going to interact with the system. Figure 1.0 below shows the authentication use case diagram for the system. An advantage of use case diagrams is that it captures all the functional requirements that are required to be implemented in the system. Thus, the client has a clear picture of how user interaction is going to happen. Adding continuous value to the project over time since the diagrams do not contain any requirements that are not required in the project. Thereby, preventing waste which does not add any value to the project

![EtherTixAuthUseCase](https://user-images.githubusercontent.com/29733613/193007485-42a47ce9-6cee-4863-a558-4cc1b6f26e17.png)

