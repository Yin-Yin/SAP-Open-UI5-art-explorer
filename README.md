# Art Explorer
- Explore art styles. 

--------

# _DEPRECATED_

An experiment to explore the paintings and pictures of the wikiart website in a different way. You could choose a style and then explore the images of that category by pressing "random" and getting a random image. It was a nice way to explore the art styles, that I did not find on their website. 
It was inspired by a twitter bot. 

However due to a change in their api, it is not free anymore, at least not if it is not academically. And is a fun project academic? I guess in some way. Anyway the technology is also outdated by now and it is time to say goodbye. It was a nice idea and I found some great inspirational images through it. So, thanks for that, "art explorer". 

----------

<img width="1533" alt="image" src="https://user-images.githubusercontent.com/13853689/167399631-ddaa3388-86b4-40de-a9ea-478463057d86.png">

A demo of UI5 where you can explore paintings of different styles of art. The pictures come from [WikiArt](https://www.wikiart.org/). 

Find the app here: [artexplorer.netlify.com](https://artexplorer.netlify.com/). 

You can also run the app locally and play around with it: 

## Run the app locally
* Install Node.js (from [nodejs.org](http://nodejs.org/)).
* Install the Grunt CLI
    ```sh
    npm install --global grunt-cli
    ```
* Clone the repository and navigate into it
    ```sh
    git clone https://github.com/SAP/openui5-sample-app.git   toDO: modify directory settings here to reflect this app
    cd openui5-sample-app	toDO: modify directory settings here to reflect this app
    ```
* Install all npm dependencies (also installs all bower dependencies)
    ```sh
    npm install
    ```

## Usage
### Server
Run `grunt serve` to start a local server with your application at [http://localhost:8080](http://localhost:8080).

Run `grunt watch` to also execute your unit tests automatically after every change.

### Code validation
Run `grunt lint` to run static code checks on your project.

Run `grunt test` to execute all tests and get a coverage report.

### Build
Run `grunt build` to build a deployable version of your app to `/dist`.


		
## User stories: 
Bernard the art lover wants to explore some art. 

##### User Story 1: see random paintings: 
	Bernard wants to open the app and immediately see some random paintings. He wants to change to another random image.
	
##### User Story 2: change the painting style, that Bernard can see. 
	Bernard wants to select the painting style in which he sees random paintings. He wants to select it from a list of different styles 

### Lessons Learned
- It gets difficult if you want to do something else than what is intended with the FIORI guidelines. You should really stay within the borders of the framework.
- UX is tough 

## Data model

	- settings
	- paintingHistory
	- displayedImage
	- pageNumberToLoad
	- paintingStyles
		- name
		- divider
		- url
		- featured


## Known bugs:
 - If you open a style through the frontpage the featured flag is not working.
 - Sometimes a picture is loaded twice. It looks as like nothing has happened. > It would be good to avoid this.
 - Intro Page is scrolling down every time the site loads
 - only the first 60 (?) images of one style is loaded (there needs to be a mechanism that loads more images)


## ToDos
- rework data model + documentation
 - add button to load more pictures in the pool
 	- extend the model for the styles and store the data for each style
     	- like this we do not need to load already loaded data again
     	- romantic style
     		- featured
     		- all others
     			- pages loaded x
     	- check how many pages are loaded already
     	- if it is maximum deactivate button
     	- if not, load how many are laoded already +1
     	- make a new method that loads the pages
    - other option to add buttons:
        - add a number of buttons like [page 1], [page 2]
        - depending on how many pictures there are divided by 60 (how many pictures are on one page)
        - tie the buttons to the loading of the page
 	
 - make one modal that caters the whole painting pool functions
 	- move style comboBox in it?
 - display random style correctly	

 - fix css in paintings pool modal
 - fix main page
 	- which element to use?

 - encoding of strings like names etc
 - change the namespace of the app to : art.explorer or something (replace sap.ui.demo.todo) // https://stackoverflow.com/questions/40273481/how-use-namespaces-in-sapui5
 - introduce unit tests/ qunit https://blogs.sap.com/2013/03/19/how-to-build-testable-sapui5-applications/

 - add readme that explains core concepts: how to do build (with grunt), where to find the app, what is the purpose: exploration of art is the idea
 on the first intro page when you open the App: the purpose of this app is to explore art. May be you can discover something new that you like and didn't know before. I found some new nice art styles that I didn't know before. I got the idea from  http://veekaybee.github.io/2018/02/19/creating-a-twitter-art-bot/#
 optimized for Chrome
 
 - add comments to code

 - change console.log() to jQuery.sap.log.error()/.info()/etc.
 
 - crawl the API to be independent of API (also imgs)

### may be:
 - add favourite functionality with which you can favourite your most liked pictures and store this in the local storage
 - have small pictures enlarged, like this: maximum width is 100%, but minimum height is 100%
 - is it possible to change the url #painting-style - for whichever category is selected?
 - define user stories


### Notes
You can choose any name for your namespace like "my.company.name". Since, I want all my paths to start where my index.html is, I used "./". You can always provide the reference path inplace of "./". Eg: "my.meta.models": "./models_folder/myTestmodel_folder" . This means when I say -> "my.meta.models.someResoucename" , UI5 will search in path-> "./models_folder/myTestmodel_folder/someResourceName".

WikiArt API Writeup
https://docs.google.com/document/d/1Vxi5lQnMCA21dvNm_7JVd6nQkDS3whV3YjRjbwWPfQU/edit#heading=h.cjff5xiokcy6
Inspiration for the app
https://dev.to/vboykis/building-a-twitter-art-bot-with-python-aws-and-art--74p

http://www.wikiart.org/en/App/wiki/DictionariesJson/1

	Art Movement 1 (artist)
	Style 2 (artist, painting)
	Genre 3 (painting)
	Technique 4 (painting)
	Painting school or group 7 (artist)
	Nation 10 (artist)
	Field 11 (artist)
