/**
* Generic
*/
// Une fonction de compatibilite pour gérer les evenements
function addEvent(element, type, listener){
  if(element.addEventListener){
    element.addEventListener(type, listener, false);
  }else if(element.attachEvent){
    element.attachEvent("on"+type, listener);
  }
}


/**
* Accueil
*/
function adpaterALaTailleDeLaFenetre(){
  var largeur = document.documentElement.clientWidth;
  var hauteur = document.documentElement.clientHeight;

  var source = document.getElementById('accueil'); // recupere l id source
  source.style.height = (hauteur-50)+'px'; // applique la hauteur de la page
  source.style.width = largeur+'px'; // la largeur
 // $(".sTop").attr("style",'height:'+(hauteur-50)+'px');
 $(".sTop").attr("style",'height:'+(hauteur-75)+'px');
}


function parallaxAjust()
{
  var cadreParallax = $("#parallax").height();
  $("#parallax > div > img").each(
    function()
    {
      $(this).css("top",(($(this).height()-cadreParallax)/2)*-1);
    }
  );
}


/**
* Competences
*/
function init_slides()
{
        $(".skills_softwares").children(".row").css({top:0,opacity:0});
        $(".skills_softwares").find(".col").children("div").css({height:0});
        $(".skills_softwares").find(".col").children("h1").css({marginBottom:-10,opacity:0});
        $(".skills_softwares").next("p").css({opacity:0})
    }

 function anim_slide_skills_softwares()
 {
    1<$(".skills_softwares").length&&$(".skills_softwares").eq(0).remove();
    $(".skills_softwares").children(".row").each(
            function(a){
                $(this).delay(150*a).fadeIn(0,function(){TweenMax.to($(this),.3,{top:60*a,opacity:1,ease:Back.easeOut})})}
        );
        setTimeout(function(){
$(".skills_softwares").find(".col").children("div").each(function(a){
$(this).delay(150*a).fadeIn(0,function(){
TweenMax.to($(this),.3,{height:parseInt(2.4*$(this).data("skills")),ease:Back.easeOut})})})},750);

setTimeout(function(){
TweenMax.to($(".skills_softwares").next("p"),1.5,{opacity:1,ease:Back.easeOut})},1500);setTimeout(function(){$(".skills_softwares").find(".col").children("h1").each(
function(a){$(this).delay(150*a).fadeIn(0,function(){
TweenMax.to($(this),.3,{marginBottom:20,opacity:1,ease:Back.easeOut})})})},750)
}

function dataSkillsRefresh(pHash)
{
var affichage = "";
for(comp in pHash)
{
     affichage += '<div class=\"col\"><div data-skills=\"'+pHash[comp]+'\"></div><h1>'+comp+'</h1></div>';
}
return affichage;
}


  skills = {
     "FRAMEWORKS J2EE" : {
         "Struts" : 80,
         "GWT" : 70,
         "JSF2" : 90,
         "Spring" : 80,
         "Hibernate" : 80
     },
         "FRAMEWORKS JAVASCRIPT" : {
         "JQuery" : 90,
         "BootStrap" : 70,
         "AngularJs" : 40,
         "Mozilla Fondation" : 70,
     },
         "OUTILS" : {
         "Eclipse" : 80,
         "Maven" : 90,
         "Hudson" : 80,
         "Sonar" : 70,
         "Redmine" : 90,
         "Soap UI" : 70,
     },
         "SERVEURS" : {
         "Tomcat" : 80,
         "JBoss" : 70,
         "WebLogic" : 90,
         "WebSphere" : 60,
   "GlassFish" : 50,
     },
            "BASES DE DONNEES" : {
         "Oracle" : 80,
         "MongoDB" : 70,
         "MySQL" : 90,
         "PostgreSQL" : 80,
         "Ldap" : 80,
         "XSD/XML" : 70,
     },
    }

function playSkillsAnimation(pColumn)
{
  $(".skills_softwares > .columns").html(dataSkillsRefresh(pColumn));
  init_slides();
  anim_slide_skills_softwares();
}



    // wait until all the resources are loaded
    //window.addEventListener("load", findSVGElements, false);

    // fetches the document for the given embedding_element
    function getSubDocument(embedding_element)
    {
      if (embedding_element.contentDocument)
      {
        return embedding_element.contentDocument;
      }
      else
      {
        var subdoc = null;
        try {
          subdoc = embedding_element.getSVGDocument();
        } catch(e) {}
        return subdoc;
      }
    }

    function findSVGElements()
    {
      var elms = document.querySelectorAll("#profilAnimation");
      for (var i = 0; i < elms.length; i++)
      {
        var subdoc = getSubDocument(elms[i])
        if (subdoc)
          subdoc.getElementById("animAge").setAttribute("begin", "0s");
      }
    }

   var ageActive = true;
   var formationActive = false;
   var position = 0;



    var profilLogos = {
    "#agePicture":1000,
   "#formationPicture":1400,
  "#localisationPicture" :1800,
   "#experiencesPicture" :2200,
   "#companiePicture" :2600
 };


var previousIndexLogo = "#agePicture";


/**
* \param pToBottom true in bottom direction; else false
*
*/
function playProfilAnimation(pGoToBottom, pScreenPosition)
{
  var newIndexLogo = 0;

  for(var aLogo in profilLogos)
  {
    if(profilLogos[aLogo] <= pScreenPosition && pScreenPosition < profilLogos[aLogo]+400)
    {
      newIndexLogo = aLogo;
    }
  }

 if(previousIndexLogo != newIndexLogo)
  {
      $( previousIndexLogo).animate({ "left": ((pGoToBottom) ? "+":"-") + "=476px" }, 500,"easeOutQuart",function(){
      $( newIndexLogo).animate({ "left": ((pGoToBottom) ? "+":"-") + "=476px" }, 600,"easeOutQuart");
    });
      previousIndexLogo = newIndexLogo;
  }
}

//Initialisation du menu
$(document).ready( function() {


window.onscroll = function(){


var screenPosition = $(window).scrollTop();


if(1000 < screenPosition && screenPosition < 3000)
{

  playProfilAnimation((position < screenPosition), screenPosition);
  position = screenPosition
}


};

	//Page d accueil
	// On execute la fonction une premiere fois au chargement de la page
	//addEvent(window, "load", adpaterALaTailleDeLaFenetre);
	// Puis à chaque fois que la fenetre est redimensionnee
	addEvent(window, "resize", adpaterALaTailleDeLaFenetre);

  adpaterALaTailleDeLaFenetre();


    $('#parallax .parallax-layer')
    .parallax({
        mouseport: jQuery('#parallax')
    });

	//Menu init
    $('.subMenu').smint({
    	'scrollSpeed' : 1000
    });


  $('#menu').on('displayBackGround', function() {

    var sectionName = $('#sousMenu > .active').attr('id');

    if('sSituationActuelle' == sectionName)
    {
      $('#situationActuelle > .inner > object').css('position','fixed');

    //  $("#profilAnimation").css('position','fixed');
    //  $("#profilComment").css('position','fixed');
    }else
    {
      $('#situationActuelle > .inner > object').css('position','');

    //  $("#profilAnimation").css('position','');
     // $("#profilComment").css('position','');
    }

    //Purple
    if(['sSituationActuelle','sCompetences','sContacts'].indexOf(sectionName) != -1)
    {
      $("#menu").removeClass("couleur2");
      $("#menu").addClass("couleur1");
    //Cyan
    }else if(['sExperiences','sInterets'].indexOf(sectionName)  != -1)
    {
      $("#menu").removeClass("couleur1");
      $("#menu").addClass("couleur2");
    //None
    }else
    {
      $("#menu").removeClass("couleur1");
      $("#menu").removeClass("couleur2");
    }
  });

/*
$('#situationActuelle').on('situationActuelleStyle',function(){
  $("#profilAnimation").css('position','fixed');
});*/




  setTimeout(function(){parallaxAjust();}, 50);






  playSkillsAnimation(skills["FRAMEWORKS J2EE"]);
  $("#buttonsSkillsBar > div").each(
    function()
    {
      $(this).click(function()
      {
        playSkillsAnimation(skills[$(this).attr('data-hover')]);
      });
    }
  );

    $(".buttonsSkillsBar > a").click(function()
      {
        playSkillsAnimation(skills[$(this).attr('data-hover')]);
      });



});
