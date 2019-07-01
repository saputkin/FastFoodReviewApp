Fast food review application:

	To start the server:
		1. start mongodb using mongod
		2. node src\server\server.js # backend
		3. npm run dev # frontend

	Design:

	Relied on the boilerplate
	URL: https://github.com/majeek/simple-react-redux-reducers-saga-webkit-express-mongoose-boilerplate

	The app has 2 states: user is logged and user is unlogged, we prefred to hold the state and session of the user in the redux store instead of using a cookie or any other header token like "Authorization Token".

	State: User unlogged

		The user has a navigation bar with only 2 options to "Register" and "Login", if a use has already been registerd he may log into the system with his username and passowrd or use he's Facebook account (Facebook API). Once logged the state of the application changes to "Logged" and more options open up to the users Navigation bar (Explanation in the next section).

		If the user does not have an account he may register in the "Register" component, a user registers with "Username", "Password", "Location" (using Google API), and he may also add a photo (Drag n Drop).
		While the user types a username if it exists an error message pops instructing him to try another username

		Once a user is logged the application changes state to "User logged" state

	State: User logged

		Once the user logged the Nav bar is updated to contain the following options:
		"Home" (path: /home):
			Home screen with a search bar allowing to search for users and restaurants
		"Edit Profile"(path: /edit/profile):
			As instructed a edit profile component allowing a user to update its username and password
		"Advanced Search"(path: /advance/search):
			A component which expands the user search options
		"Signout"(path: /signout):
			Signout from the application

		Once a user has logged in he has permission to view and review a restraunt
		at the restraunts page (path: "/chain/<Restraunt Name>") the user may click the "location" link and view its location 
		in Google Maps, review with option to add photos, view and sort the past reviews.
		He may also delete and edit hes past reviews.


	Features implemented:

		As instructed the following features were implemented:

			1.Register an account with a picture, username and location
				-username: warns the user if the username is already been registered - without the need to click a button
				-picture: allows drag-and-drop image as well as picking an image file.
				-location:provides suggested locations following the letters inserted

			2.User profile:
				-each user has the ability to view other users profile(username, location, reviews)
				-each user has the ability to modify own profile properties: username, location
				-each user may see a list of their reviews edit and delete them

			3.Login/Logout ability:
				-session is implementede using the redux store state
				-view and edit own profile
				-BONUS FEATURE: login with facebook account using Facebook API

			4.Write a restaurant review:
				-write a review rating the restraunt and adding photos to the review
				-view the restraunt location on a map (using Google API)

			5.Search restaurant:
				Simple search:
					-search restaurant by accurate name and view its details(name, location, average review score) and reviews
				Advanced search:
					- search restaurant by name, yield list of restaurants sorted by similarity of it's name to the searched name
					- search restaurant by location, yield list of restaurants ordered by distance to the user location.
					- search by both name and location mixed the two above.
					- search better-closer in scale. allow the user to determine the parameters of the 	search - the weight of the distance to user location, and the weight of the quality of the restaurant.
					**NOTE** User that would like to enjoy the ability of advance search that envolves location, must add it's on location while register or in edit profile. Otherway the result will be strange and inaccurate.

			6.Search user:
				-search by username and location
				-view the found users profile 


			BONUS FEATURES:
				Google Maps integration:
					-when a user registers hes location, there is an autosuggest to its location
					-when viewing restraunt you may view its location in a map.

				Login via Facebook:
				 	-allow the user the log with hes facebook account

	Flow example:
		1. Registering a user:
			When a user enters "Register" the component peforms the method "componentDidMount"
			in which we ask the server to send us all the username => save the users in the redux store using the
			reducer.
			When the user types hes username there is an event handler which updates the state "username" field with
			the typed values also checking if the typed username already exists using the user list we got in the begining.
			all the other fields such as location and password are also saved to the redux store using an event handler.
			When a user finished filling the form and submits it, we catch the action using  Register saga using POST send 
			the user informatio to the server.
			The server responds with ok once the user has been registered to the db => saga send registerSuccess action to the reducer which in turn sets the feild "loginsuccess" in the redux store => redirects the user to the login page.

		2. Review a restraunt:
			A user fills the review form => eventHandler recives the rating and updates the component state.
			user uploads images which in turn are saved in the component state in a base64 format.
			User submits the review => saga catchs the action => sends the review including the photos to the server => the server adds the review to the restraunts review array, responds with the review back to the client, the "chains" saga takes the review and using "reviewSuccessAction" action sends to the reducer the review => the reducer inserts the review into the chains review
			=> the props of the restraunt page is updated(we inserted a new review), the component is rerendred and we can view the
			review.

	Mongoose Models:
		**NOTE**:
		We are adding some exported models to help you import restraunts with all the required fields
		chains1819.json : contains restraunts with locations (for the google API)
		users.json : some users for your review.

		We have created 3 new Schemas and 2 models

		user schema respresenting a user in the database after he has been registered:
		{
			username: {
				type: String,
				required: true,
				unique: true
    		},
   		    password: String,
    		location: {
				description: String,
				location: {
					lat: Number,
					lng: Number
				}
    		},
    		photo: {
      			name:String,
      			file_type:String,
      			base64:String
    		},
			reviews: [revieSchema]
  		}

  		a review schema represeing a restraunt review:
  		{
    		restaurantName: String,
    		reviewerName: String,
    		creationDate: Date,
   		    bathroom: Number,
    		staff: Number,
    		clean: Number,
    		drive: Number,
    		delivery: Number,
    		food:Number,
    		average: Number,
    		photos:[String]
  		}

  		a restaurant(chain) schema reprensting a restraunt with its reviews:
  		{
    		name: String,
    		location: {
        		description: String,
        		location: {
          			lat: Number,
          			lng: Number
        		}},
    			average: Number,
    			reviews:[reviewSchema]
		}

		we created two models One from the user schema and the other from the chain schema

	Extra Libraries and Components:

		semantic-ui-react - the ui library we choose to use
		react-notifcation - nice and colorfull alerts and notifcations
		react-router-dom - to route the apps paths
		moment - allows controling dates more easly
		history - easy routing and holding the apps history paths
		google-maps-react - to integrate and view google maps
		react-facebook-login - allows to easly integrate facebook login into a react app
		react-dropzone - a dropzone component
		react-geosuggest - a Component which auto suggests geo locations using Googles API










	

