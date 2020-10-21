var req = new XMLHttpRequest();


function Refresh()
{
    var cook = document.cookie;
    
    //get the perosn
    var loc1 = cook.indexOf("person");
    loc1 = cook.indexOf("=", loc1 + 1);
    var loc2 = cook.indexOf(";", loc1 + 1);
    if (loc2 == -1)
    {
        loc2 = cook.length;
    }
    var person = cook.substring(loc1 + 1, loc2);
    console.log(person);
    
    //get the meeting id
    loc1 = cook.indexOf("meetingid");
    loc1 = cook.indexOf("=", loc1 + 1);
    loc2 = cook.indexOf(";", loc1 + 1);
    if (loc2 == -1)
    {
        loc2 = cook.length;
    }
    var meetingid = cook.substring(loc1 + 1, loc2);
    console.log(meetingid);

    //Create the response
    req.open("GET", "https://timhchatroom.azurewebsites.net/api/GetMeetingChat?meetingid=" + meetingid);
    req.onreadystatechange = OnReturn;
    req.send();
}

function OnReturn()
{
    if (req.readyState == 4 && req.status == 200)
    {
        //Clear the list
        while (document.getElementById("chatul").childElementCount > 0)
        {
            document.getElementById("chatul").removeChild(document.getElementById("chatul").childNodes[0]);
        }

        //Kick off the for each
        var obj = JSON.parse(req.responseText);
        obj.forEach(PrintSingle);
    }
}

function PrintSingle(msg)
{

    var entry = document.createElement("li");
    
    entry.innerText = "<" + msg.Person + "> " + msg.Message;

    if (msg.Person == "defendant")
    {
        entry.className = "msgD";
    }
    else if (msg.Person == "plaintiff")
    {
        entry.className = "msgP";
    }
    else if (msg.Person = "moderator")
    {
        entry.className = "msgM";
    }

    //Append it to the list
    document.getElementById("chatul").appendChild(entry);
    
}


//Refresh it to show
Refresh();



///EVERYTHING BELOW IS FOR THE SENDING

var reqr = new XMLHttpRequest();

function SendMsg()
{
    var cook = document.cookie;
    
    //get the perosn
    var loc1 = cook.indexOf("person");
    loc1 = cook.indexOf("=", loc1 + 1);
    var loc2 = cook.indexOf(";", loc1 + 1);
    if (loc2 == -1)
    {
        loc2 = cook.length;
    }
    var person = cook.substring(loc1 + 1, loc2);
    console.log(person);
    
    //get the meeting id
    loc1 = cook.indexOf("meetingid");
    loc1 = cook.indexOf("=", loc1 + 1);
    loc2 = cook.indexOf(";", loc1 + 1);
    if (loc2 == -1)
    {
        loc2 = cook.length;
    }
    var meetingid = cook.substring(loc1 + 1, loc2);
    console.log(meetingid);

    //Get the msg
    var msg = document.getElementById("textinput").value;
    console.log(msg);

    reqr.open("POST", "https://timhchatroom.azurewebsites.net/api/SendMessage?meetingid=" + meetingid + "&person=" + person);
    reqr.onreadystatechange = OnCallComplete;
    reqr.send(msg);
}

function OnCallComplete()
{
    if (reqr.readyState == 4 && reqr.status == 200)
    {
        Refresh();
    }
}