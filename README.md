# :iphone: Matching-app feature
## :musical_note: Description
For Blok-Tech we have to create a feauture for a matching-webapp. We learn to work with Git/GitHub, Node.js, Express, EJS & Mongodb Atlas.

My target audience for this project are people who want to find other people to go to concerts/festivals with. The match is based on the music taste.

### The feature
**The job story I wanted to solve was** </br>
When I have saved someone I don't want to get to know afterwards, I want to remove this person form the 'Saved macthes'-list, so I can get to know other people. 

**There are 2 ways to delete a user with this feature**
1. Delete directly form the list, by clicking the remove-button
2. You can click on the list item of a person. This will direct you to the profile of this person. On their profile you can delete them with a button as well.

**Extra** </br>
When I was testing, I had to delete users. They actually remove form the database (ofcourse), but after a view deletes I do not have any users left. 
So instead of creating new users to delete in de database manually, I created a **sign in page**. With this page you can add users to the database with a form, which is much more fun to do.

## :computer: How to install
Before you start, make sure you have Git and Node.js installed on your computer.</br>
Then you can install my feature by following these simple steps: 
1. Clone the repository by running this code in your terminal:
```
$ git clone https://github.com/Sophievanderburg/blok-tech.git
```
2. Install all the npm packages by running this code in your terminal:</br> You should see a node_modules folder in the root when it is finished.
```
$ npm install
```
3. Create a database with MongoDB Atlas. This link will help you do it: https://docs.atlas.mongodb.com/getting-started/ </br>
4. In your **database collection** you should make documents like this:</br>  
``` js
_id: objectId(" "), <-- this one will be there automatically
firstname: " "
lastname: " "
age: " "
genre1: " "
genre2: " "
genre3: " "
favSongTitle: " "
favSongArtist: " "
imgSource: " "
```

5. Create a ``.env`` file in the root of the folder. Place the following code in the ``.env`` file
```
MONGO_URI=<here comes your own mongoURI>
DB_NAME=<here comes your own database name>
DB_COLLECTION_NAME=<here comes your own collectionname>
```

And then you are good to go! :thumbsup: </br>
When you want to run the server, run this code in your terminal:
```
$ npm run dev
```


## :page_facing_up: License
MIT license - 2021 Sophie van der Burg
