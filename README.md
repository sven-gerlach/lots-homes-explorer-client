# Lots Homes Explorer

## User Stories
- [ ] View and browse available home plans and lots
- [ ] Like / store selected home plans and lots
- [ ] View saved home plans and lots
- [ ] Share specific home plans and lots with other users

## Technologies, Libraries, and Frameworks
- JavaScript
- React
- React-Router
- Sass

_Note: I took the decision to refrain from using front-end styling frameworks like Bootstrap or MUI_

## Front-End Routes
| Route                        | Comment                                   |
|------------------------------|-------------------------------------------|
| /homes                       | display all available home plans          |
| /homes&selected-home-plan=id | display all lots compatible with home :id |
| /lots                        | display all available lots                |
| /lots&selected-lot=id        | display all homes compatible with lot :id |

## Views and Components
| View / Component | Comment                                                             |
|------------------|---------------------------------------------------------------------|
| NavBar           | navigate to /homes and /lot route                                   |
| Homes            | display all available Home components                               |
| Lots             | display all available Lot components                                |
| Home             | display home data (name, beds, baths, size, tags, description, img) |
| Lot              | display lot data ( address, size, description, img                  |
| Modal            | display all lots compatible with homes and vice versa               |
