Battleship 
---

A browser-based implementation of the classic Battleship game, built with a strong focus on object-oriented design, test-driven development (TDD), and clean architecture.

This project was created as part of The Odin Project curriculum to practice designing scalable game logic, separating concerns, and validating behavior through automated tests.

🔗 Live Demo: https://itsseanez.github.io/battleship/


🚀 Features
---

This project emphasizes software engineering principles, not just UI:

- Test-Driven Development (TDD) using Jest

- Separation of game logic from DOM manipulation

- Object-oriented design (Gameboard, Ship, Player, etc.)

- Clear responsibility boundaries between modules

- Deterministic and testable game state management


🛠️ Tech Stack
---

- JavaScript (ES6+)

- Jest (Unit Testing)

- Webpack

- HTML5 / CSS3

- Babel


🧪 Testing
---

The core game logic is covered with unit tests to ensure:

- Ships are placed correctly

- Hits and misses are registered properly

- Ships are sunk when all positions are hit

- Gameboards track state accurately

- Invalid placements are rejected

- Testing-first development helped validate logic early and reduce bugs in gameplay behavior.



🗂️ Project Architecture
---

The codebase is organized around core domain objects:

- Ship — Tracks length, hits, and sunk state

- Gameboard — Manages ship placement and attack resolution

- Player — Handles turn logic and interactions

- DOM Controller — Responsible only for UI updates

📸 Screenshots
---

<img width="2538" height="1844" alt="image" src="https://github.com/user-attachments/assets/9abfe098-bcc2-44b4-a619-e3a17b7d5762" />


📈 What I Learned
---

- Applying TDD to non-trivial application logic

- Designing testable modules and interfaces

- Managing state in a turn-based system

- Structuring JavaScript projects for scalability

- Debugging complex logic through automated tests
  

🔮 Future Improvements
---

- Smarter computer AI (hunt/target strategy)

- Improved UX for ship placement

- Multiplayer mode

- Enhanced game state animations

- Difficulty levels
