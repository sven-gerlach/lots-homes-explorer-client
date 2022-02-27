# Lots Homes Explorer

## TLDR
[to come]

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

## ToDo / Feature Queue
- [x] set-out project management path, including routes, views, and components
- [x] build Navbar component
- [x] build Home and Lot component
- [x] build Homes and Lots views
- [x] display saved / all assets
- [x] solve responsive design issue of flex boxing the asset container
- [x] add rudimentary styling
- [x] build Modal
- [ ] de-couple asset such that modal uses basic asset representation without the click-feature
- [ ] favourite button feature does not work inside modal
- [ ] Integrate Redux and store component state centrally

## Considerations
1) The new react-router-dom (^6.0) has a slightly different logic behind using routes. My IDE (Webstorm) appears to have used an outdated (pre 6.0) and local TypeScript library instead of pointing to the local current one inside node-modules. With some research the answers to this [stackoverflow](https://stackoverflow.com/questions/70031839/cannot-resolve-symbol-routes) question provided a resolution.
2) Without specifying the react-router version, I installed, unbeknownst to me, a newer version ^6. Thus far, I had only worked with ^v5. The syntax has changed a fair bit, so this took some reading of the documentation to get used to it and understand the new approach.
3) To keep the code DRY, with extensibility in mind (e.g. adding a financing solution as a third asset type), and because the Homes and Lots components have very similar states, I decided to represent both assets in one component ShowInventory, displaying one Asset component. I think there is a smarter way to abstract away the clunky code (e.g. switch statements, Asset is a bit overloaded mainly because the id keys are not the same across both assets).
4) The flexbox container is perfectly responsive but if an Asset component breaks onto the last line as a single element, it expands to fill 100% of that width, making the image look grainy and generally looking slightly out of place from a design and UX perspective. Grid would solve this issue but would mean I would have to control the number of columns with media queries. Probably the better way to go.
5) Making all API requests (homes, lots, compatibles) in the showInventory component is possibly wasteful. Although I suspect the data size will be limited to a few thousand lots and homes. As long as it is not in the millions I suspect the overhead will be acceptable. 
6) It would appear showInventory is being rendered three times - which is exactly once more than I would expect.
7) Hard-coded logic in the modal. The assetId keys are hardcoded. I am sure there is a much better way to solve this without such tight coupling.

## Stretch Goals and Next Steps
- [ ] Persist saved homes and lots in local storage
- [ ] Make lots and homes linkable by adding query strings to URL
- [ ] Improve styling
- [ ] implement custom success and error messaging (e.g. failure to retrieve a response from the API or attempting to retrieve saved assets when none are saved)
- [ ] add unit testing
- [ ] Most consumers' pain-point is not understanding whether a land-plot is cheap or expensive (nobody wants to pay more than they have to). Integrating market pricing / valuation data into the Lot component could alleviate information asymmetry. Perhaps there is a Zoopla API or another pre-existing vendor that utilities public transaction data? This could be used to give users a better idea of how cheap / expensive a particular land plot is in relation to historic local or national data.
- [ ] Simulating a delayed API response with setTimeout yields a drawback of the encapsulated modelling of the /homes and /lots route in one module. That is, in case of a delayed response, the old data remains partly visible and partly clashes with asset specific syntax. This is because both routes are dealt with in one component.
