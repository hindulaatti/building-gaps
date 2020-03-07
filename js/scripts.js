var b1div = $("#building1")
var b2div = $("#building2")
var b1ontop = $("#b1ontop")
var b1onbottom = $("#b1onbottom")
var b1onright = $("#b1onright")
var b1onleft = $("#b1onleft")

var b1 = {}
var b2 = {}

$('#building1').on('change', function(e){
    b1 = JSON.parse(this.value)
    spaceBetween()
});
$('#building2').on('change', function(e){
    b2 = JSON.parse(this.value)
    spaceBetween()
});

for(i = 0; i < sizes.buildings.length; i++){
    let building = sizes.buildings[i]

    if(i == 0) {
        b1 = building
        b2 = building
    }

    $('<option>',{
        text: building.name,
        value: JSON.stringify(building)
    }).appendTo('#building1')

    $('<option>',{
        text: building.name,
        value: JSON.stringify(building)
    }).appendTo('#building2')
}

spaceBetween()

function spaceBetween(){
    if(isEmpty(b1) || isEmpty(b2)){
        return
    }

    $(".b1name").text(b1.name)
    $(".b2name").text(b2.name)

    b1ontop.text("")
    b1onbottom.text("")
    b1onright.text("")
    b1onleft.text("")

    let spaceb1t = parseInt(b1.bot) + parseInt(b2.top)
    let spaceb1b = parseInt(b1.top) + parseInt(b2.bot)
    let spaceb1r = parseInt(b1.left) + parseInt(b2.right)
    let spaceb1l = parseInt(b1.right) + parseInt(b2.left)

    // b1ontop
    for(i = 0; i < sizes.units.length; i++){
        let unit = sizes.units[i]

        if(unit.y <= spaceb1t){
            $('<li>',{
                text: unit.name
            }).appendTo('#b1ontop')
        }
    }

    // b1onbot
    for(i = 0; i < sizes.units.length; i++){
        let unit = sizes.units[i]

        if(unit.y <= spaceb1b){
            $('<li>',{
                text: unit.name
            }).appendTo('#b1onbottom')
        }
    }
    
    // b1onright
    for(i = 0; i < sizes.units.length; i++){
        let unit = sizes.units[i]

        if(unit.x <= spaceb1r){
            $('<li>',{
                text: unit.name
            }).appendTo('#b1onright')
        }
    }
    
    // b1onleft
    for(i = 0; i < sizes.units.length; i++){
        let unit = sizes.units[i]

        if(unit.x <= spaceb1l){
            $('<li>',{
                text: unit.name
            }).appendTo('#b1onleft')
        }
    }
}

function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
}