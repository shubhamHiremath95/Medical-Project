var UserSession = (function() {
    var full_name = "";
  
    var getName = function() {
        debugger;
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
        debugger;
      full_name = name;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getName: getName,
      setName: setName
    }
  
  })();
  
  export default UserSession;