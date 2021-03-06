# Lots Homes Explorer

## TLDR
- Most key requirements have been fulfilled, except for:
  - [ ] using Redux for global state management
- Some stretch goals were met too:
  - [x] Make lots and homes linkable by adding query strings to URL
  - [x] Persist saved homes and lots in local storage
- The UX is clean, well-structured, and reasonably close to the design guidelines provided
- Adding an asset to favourites inside a modal cause a re-render and reset of the scroll bar (I have not found a solution except for a hacky one with refs and storing the scroll bar position)
- Overall, the code is well documented with frequent commits
- The syntax is too tightly coupled and at not very readable. I am certain a much richer usage of custom hooks, HOCs, and render props could cross-cut concerns a lot more, make the components loosely coupled, and clean up the syntax.

## User Stories
- [x] View and browse available home plans and lots
- [x] Like / store selected home plans and lots
- [x] View saved home plans and lots
- [x] Share specific home plans and lots with other users

## Technologies, Libraries, and Frameworks
- [x] JavaScript
- [x] React
- [x] React-Router
- [x] Sass
- [ ] React-Redux

_Note: I took the decision to refrain from using front-end styling frameworks like Bootstrap or MUI_

## Front-End Routes
| Route  | Comment                          |
|--------|----------------------------------|
| /homes | display all available home plans |
| /lots  | display all available lots       |
| /*     | display a quasi-404              |

## Views and Components
| View / Component | Comment                                                                                |
|------------------|----------------------------------------------------------------------------------------|
| NavBar           | navigate to /homes and /lot route                                                      |
| ShowInventory    | manage business logic for displaying homes and lots assets                             |
| Asset            | display asset-specific home/lot data (name, beds, baths, size, tags, description, img) |
| Modal            | display all lots compatible with homes and vice versa                                  |

## State Considerations
- Eventually state needs to be stored in Redux. Since I have not yet worked with Redux I will first build the mock without Redux and attempt migration at a later point.

## ToDo / Feature Queue
- [x] set-out project management path, including routes, views, and components
- [x] build Navbar component
- [x] build Home and Lot component
- [x] build Homes and Lots views
- [x] display saved / all assets
- [x] solve responsive design issue of flex boxing the asset container
- [x] add rudimentary styling
- [x] build Modal
- [x] de-couple asset such that modal uses basic asset representation without the click-feature
- [x] fix modal being loaded when the url + query string is entered exogenously into the browser
- [x] favourite button feature does not work inside modal
- [ ] clicking the heart icon causes a brief re-render of the img and when the user likes an asset inside the modal it causes the scroll position to be reset to the beginning
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
- [x] Make lots and homes linkable by adding query strings to URL
- [x] Persist saved homes and lots in local storage
- [ ] Improve styling
- [ ] implement custom success and error messaging (e.g. failure to retrieve a response from the API or attempting to retrieve saved assets when none are saved)
- [ ] add unit testing
- [ ] Most consumers' pain-point is not understanding whether a land-plot is cheap or expensive (nobody wants to pay more than they have to). Integrating market pricing / valuation data into the Lot component could alleviate information asymmetry. Perhaps there is a Zoopla API or another pre-existing vendor that utilities public transaction data? This could be used to give users a better idea of how cheap / expensive a particular land plot is in relation to historic local or national data.
- [ ] Simulating a delayed API response with setTimeout yields a drawback of the encapsulated modelling of the /homes and /lots route in one module. That is, in case of a delayed response, the old data remains partly visible and partly clashes with asset specific syntax. This is because both routes are dealt with in one component.
