var friends = {};
friends.names = {};

friends.claim = function(name){
    if(!name || friends.names[name]){
        return false;
    }else{
        friends.names[name] = true;
        return true;
    }
};

var index = 0;
/*
* Use LRU pattern to find unused guest name and claim it.
**/
friends.getGuestName = function(new_name){
    var name; var nextUserId = 1;
    var names = [];

    do{
        if (new_name !== ""){
            names[index] = new_name;
            if (names[index] !== "" && names[index] !== undefined) {
                name = names[index];
                index += 1;
            }
        }else {
            if(names[index] == undefined){
                name = 'Guest ' + nextUserId;
                nextUserId += 1;
            }
            index -= 1;
        }
    }while(!friends.claim(name) && !friends.claim(names[index]));

    return name;
};

/**
* Serialize claimed names.
*/
friends.getFriends = function(){
    var names = [];
    var name;

    for(name in friends.names) {
        names.push(name);
    }
    return names;
};

/**
* Delete friend.
*/
friends.removeFriend = function(name){
    if(friends.names[name]){
        delete friends.names[name];
    }
};

module.exports = friends;