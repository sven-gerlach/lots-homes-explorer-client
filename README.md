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
| Lot              | display lot data (address, size, description, img)                  |
| Modal            | display all lots compatible with homes and vice versa               |

## State Considerations
- Eventually state needs to be stored in Redux. Since I have not yet worked with Redux I will first build the mock without Redux and integrate it later.
- 

## ToDo
- [x] set-out project management path, including routes, views, and components
- [ ] build Navbar component
- [ ] build Home and Lot component (HOC)
- [ ] build Homes and Lots views (HOC)
- [ ] build Modal (HOC)
- [ ] Integrate Redux and store component state centrally

## Stretch Goals
- [ ] Persist saved homes and lots in local storage
- [ ] Make lots and homes linkable by adding query strings to URL
- [ ] Improve styling of the page

## Next Steps
- [ ] Most consumers' pain-point is not understanding whether a land-plot is cheap or expensive (nobody wants to pay more than they have to). Integrating market pricing / valuation data into the Lot component could alleviate information asymmetry. Perhaps there is a Zoopla API or another pre-existing vendor that utilises public transaction data? This could be used to give users a better idea of how cheap / expensive a particular land plot is in relation to historic local or national data.
