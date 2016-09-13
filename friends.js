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

    do{
        if (new_name !== "" && new_name !== undefined){
            name = new_name;
        }else {
                name = 'Guest ' + nextUserId;
                nextUserId += 1;
        }
    }while(!friends.claim(name));

    return name;
};

/**
* Serialize claimed names.
*/
friends.getFriends = function(userList){
    var names = [];
    var name;

    for(name in friends.names) {
        names.push(name);
        if (userList.length > 0) {
            userList.forEach(function (value, index) {
                if (value == name) {
                    delete names[index + 1];
                }
            });
        }
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