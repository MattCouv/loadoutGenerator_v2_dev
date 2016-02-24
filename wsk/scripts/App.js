$( document ).ready( function() {
  function rnd( x ) {
    return alea = Math.round( Math.random() * x );
  }
  var pd;
  $( "#sub" ).click( function() {
    var soldier = $( "#soldiername" ).val();
    console.log( soldier );

    var plat = $( "#platform" ).val();
    console.log( plat );
    if ( !soldier || !plat ) {
      $( "#error" ).css( "display", "block" );
    }else {
      $.getJSON( "http://api.bf4stats.com/api/playerInfo?plat=" + plat + "&name=" + soldier +
      "&opt=assignments,imagePaths,names,upcomingUnlocks,weapons,details,kititems&output=json",
       function( json ) {
        pd = json;
        console.log( "pd" + pd );
      } );

      $( "#error" ).css( "display", "none" );
      $( "#login" ).css( "display", "none" );
      $( "#loadout" ).css( "display", "block" );
      generate();
    }
  } );
  var kits = [ "assault", "engineer", "support", "recon" ];
  var kit;
  var gadget = [];
  function generate() {
    kit = kits[ rnd( 3 ) ];
    console.log( kit );
    var pre = rndPrimary( gunAssign, rndCats( kit ) ),
    hand = rndPrimary( handgunAssignments, "SIDEARM" ),
    grenade = rndPrimary( gunAssign, "GRENADE" ),
    knife = rndPrimary( knifeAssignments, "KNIFE" );
    $( ".picture" ).css( { "background": "url(./assets/bf4/kits/" + kit +
     ".png) no-repeat", "background-size": "100%" } );
    $( ".Pname" ).html( pre.name );
    $( ".primaryW" ).css( { "background": "url(./assets/" + pre.imgLineart +
     ") no-repeat", "background-size": "auto 54.4px" } );
    $( ".Hname" ).html( hand.name );
    $( ".handgunW" ).css( { "background": "url(./assets/" + hand.imgLineart +
     ") no-repeat", "background-size": "auto 54.4px" } );
    $( ".kitname" ).html( kit );
    $( ".items .item:nth-child(4) .itempic" ).css( { "background": "url(./assets/" +
     grenade.imgLineart + ") no-repeat", "background-size": "100%" } );
    $( ".items .item:nth-child(4) .name" ).html( grenade.name );
    $( ".items .item:nth-child(5) .itempic" ).css( { "background": "url(./assets/" +
     knife.imgLineart + ") no-repeat", "background-size": "100%" } );
    $( ".items .item:nth-child(5) .name" ).html( knife.name );

  }

  $( ".gen" ).click( function() {
    generate();
  } );
  function rndCats( x ) {
    var cat;
    var cats = [];
    if ( x === "assault" ) {
      cats = [ "ASSAULT RIFLE", "CARBINE", "SHOTGUN", "DMR" ];
    }else if ( x === "engineer" ) {
      cats = [ "PDW", "CARBINE", "SHOTGUN", "DMR" ];
    }else if ( x === "support" ) {
      cats = [ "LMG", "CARBINE", "SHOTGUN", "DMR" ];
    }else if ( x === "recon" ) {
      cats = [ "SNIPER RIFLE", "CARBINE", "SHOTGUN", "DMR" ];
    }
    cat = cats[ rnd( cats.length - 1 ) ];
    return cat;
  }
  $( ".primaryW" ).click( function() {
    var pre = rndPrimary( gunAssign, rndCats( kit ) );
    $( ".primaryW" ).css( { "background": "url(./assets/" + pre.imgLineart +
     ") no-repeat", "background-size": "auto 54.4px" } );
    $( ".Pname" ).html( pre.name );
  } );
  $( ".handgunW" ).click( function() {
    var hand = rndPrimary( handgunAssignments, "SIDEARM" );
    $( ".handgunW" ).css( { "background": "url(./assets/" + hand.imgLineart +
     ") no-repeat", "background-size": "auto 54.4px" } );
    $( ".Hname" ).html( hand.name );
  } );
  $( ".items .item:nth-child(4)" ).click( function() {
    var grenade = rndPrimary( gunAssign, "GRENADE" );
    $( this ).find( ".itempic" ).css( { "background": "url(./assets/" +
     grenade.imgLineart + ") no-repeat", "background-size": "100%" } );
    $( this ).find( ".name" ).html( grenade.name );
  } );
  $( ".items .item:nth-child(5)" ).click( function() {
    var knife = rndPrimary( knifeAssignments, "KNIFE" );
    $( this ).find( ".itempic" ).css( { "background": "url(./assets/" +
     knife.imgLineart + ") no-repeat", "background-size": "100%" } );
    $( this ).find( ".name" ).html( knife.name );
  } );

  //List chosen gun

  function listGUns( a, x ) {

    //A=variables above and x="GRENADE","ASSAULT RIFLE","CARBINE",
    //"LMG","PDW","DMR","SNIPER RIFLE","SIDEARM","SHOTGUN"
    var y = 0;

    for ( var i = 0; i < pd.weapons.length; i++ ) {
      if ( pd.weapons[ i ].detail.category === x ) {
        a[ y ] = pd.weapons[ i ];
        y++;
      }else {
        y = y;
      }
    }
    console.log( a );
    console.log( a.length );
    return a;
  }

  //List Gadgets
  //var Gadget=[];

  function listGadgets( a, b, c ) {

    //A=array of the specific class,b=the class, c=just for engineers,
    // support or recon , it consist of "CARBINE","SHOTGUN","DMR"
    var y = 0;
    var item = [];
    for ( var i = 0; i < pd.kititems.length; i++ ) {
      if ( pd.kititems[ i ].detail.category === "GADGET" && pd.kititems[ i ].detail.kit === b &&
       pd.kititems[ i ].detail.name != c ) {
        item[ y ] = pd.kititems[ i ];
        y++;
      }else {
        y = y;
      }
    }
    for ( i = 0; i < pd.weapons.length; i++ ) {
      if ( pd.weapons[ i ].detail.category === "GADGET" &&
       pd.weapons[ i ].detail.kits[ 0 ] === b ) {
        item[ y ] = pd.weapons[ i ];
        y++;
      }else {
        y = y;
      }
    }
    $.each( item, function( i, el ) {
      if ( $.inArray( el, a ) === -1 ) {
         a.push( el );
      }
    } );

    console.log( a.length );
    return a;
  }

  // This function fides in the json array the objects with the desired type
  function unlockItem( x ) {

    //Have to receive the category of the item for instance weapon or weaponUnlock
    var y = 0;
    var item = [];
    for ( var i = 0; i < pd.upcomingUnlocks.length; i++ ) {
      if ( pd.upcomingUnlocks[ i ].type === x ) {
        item[ y ] = pd.upcomingUnlocks[ i ];
        y++;
      }else {
        y = y;
      }
    }
    return item;
  }

  //This function creates an array with guns not
  //yet unlocked to compare with the selected category to then substracte them
  function unlockGun( x, a ) {

    //Have to receive the category of the primary for instance RIFLE or DMR
    var y = 0;
    var primary = [];
    for ( var i = 0; i < a.length; i++ ) {
      if ( a[ i ].subname === x ) {
        primary[ y ] = a[ i ];
        y++;
      }else {
        y = y;
      }
    }
    return primary;
  }
  var gunAssign = [
  { id: "F2000", name: "Express Train" },
  { id: "AS VAL", name: "CO-PILOT" },
  { id: "DAO-12", name: "DEAD STOP" },
  { id: "M60-E4", name: "DUST DEVIL" },
  { id: "BULLDOG", name: "Lions and Tigers and Bears" },
  { id: "ACE 23", name: "Assault Expert" },
  { id: "UMP-9", name: "Engineer Expert" },
  { id: "FY-JS", name: "Recon Expert" },
  { id: "RPK-12", name: "Support Expert" },
  { id: "GOL Magnum", name: "Eagle's Nest" },
  { id: "L85A2", name: "Open Fire" },
  { id: "MP7", name: "Make a dent" },
  { id: "RPK", name: "Powder Keg" },
  { id: "L115", name: "Need Only One" },
  { id: "AR160", name: "Spare time Sniper" },
  { id: "SR-2", name: "Packing a Punch" },
  { id: "AWS", name: "Swiss Cheese" },
  { id: "SR338", name: "Always Deadly" },
  { id: "MPX", name: "Not the Weakest Link" },
  { id: "CS5", name: "The 'I' in Team" },
  { id: "QBZ-95-1", name: "To Valhalla (Campaign)" },
  { id: "P90", name: "Peace Maker (Campaign)" },
  { id: "M249", name: "Final Duty (Campaign)" }
  ];
  var handgunAssignments = [
  { id: "UNICA 6", name: "Big Splash" },
  { id: "M412 REX", name: "Tombstone Actual (Campaign)" },
  { id: "SW40", name: "Curve Ball" }
  ];
  var gadgetAssignments = [
  { id: "SUAV", name: "Safe Raiding" },
  { id: "UCAV", name: "Eyes in the Sky" },
  { id: "BALLISTIC SHIELD", name: "Vanguard" },
  { id: "DS-3 DECOY", name: "Disinformation" },
  { id: "TARGET DETECTOR", name: "Eye Spy" }
  ];
  var knifeAssignments = [
  { id: "SHANK", name: "Fang of the Underworld (Campaign)" },
  { id: "MACHETE", name: "A Trapped Wolf Will (Campaign)" }
  ];

  function rndPrimary( x, a ) {//X=one of the tables above a=wich weapon category
    var Gun = [];
    listGUns( Gun, a );
    var pre;
    var gun = true;
    do {
      var tocheck = [];
      pre = Gun[ rnd( Gun.length - 1 ) ];
      for ( var i = 0; i < x.length; i++ ) {
        if ( x[ i ].id === pre.name ) {
          tocheck[ 0 ] = x[ i ];
        }
      }
      if ( !tocheck[ 0 ] ) {
        console.log( pre.name );
        gun = gunUnlock( pre.name, unlockGun( a, unlockItem( "weapon" ) ) );
        console.log( gunUnlock( pre.name, unlockGun( a, unlockItem( "weapon" ) ) ) );
      }else {
        gun = gunAssignments( tocheck[ 0 ].name );
      }
    }
    while ( gun === false );
    return pre;
  }

  function gunAssignments( x ) {
    var assignment;
    var checked = 0;
    for ( var i = 0; i < pd.assignments.length; i++ ) {
      if ( pd.assignments[ i ].name === x ) {
        assignment = pd.assignments[ i ];
      }
    }
    console.log( assignment );
    if ( undefined === assignment ) {
      gun = true;
    }else {
      for ( i = 0; i < assignment.criterias.length; i++ ) {
        if ( assignment.criterias[ i ].curr === assignment.criterias[ i ].needed ) {
          checked++;
        }else {checked = checked;}
      }
      if ( checked === assignment.criterias.length ) {
        gun = true;
      }else {
        gun = false;
      }console.log( assignment.criterias.length );
    }
    console.log( checked );
    return gun;
  }
  function gunUnlock( x, y ) {//X=pre.name
    var not = false;

    for ( var i = 0; i < y.length; i++ ) {

      if ( y[ i ].name === x ) {
        not = true;
      }
    }
    if ( not === true ) {
      gun = false;
    }else {gun = true;}console.log( gun );
    return gun;
  }
} );
