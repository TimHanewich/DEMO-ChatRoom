function Login()
{
    var rb_p = document.getElementById("plaintiff");
    var rb_d = document.getElementById("defendant");
    var rb_m = document.getElementById("moderator");

    //Get the name of person
    var person = "";
    if (rb_p.checked)
    {
        person = "plaintiff";
    }
    else if (rb_d.checked)
    {
        person = "defendant";
    }
    else if (rb_m.checked)
    {
        person = "moderator";
    }

    //Get the meeting id
    var meetingid = document.getElementById("meetingid").value;


    //Store the cookies
    document.cookie = "person=" + person + ";expires=Fri, Mar 2022 12:00:00 UTC; path=/";
    document.cookie = "meetingid=" + meetingid + ";expires Fri, Mar 2022 12:00:00 UTC; path=/";



    //Redirect them to the chat page
    window.location.href = "chat.html";
}