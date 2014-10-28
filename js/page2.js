var bAnimate = true;
var nDoor1 = Math.abs(Math.round(generateBivariateNormal(5, 30)));
var nDoor2 = Math.abs(Math.round(generateBivariateNormal(5, 30)));
var nDoor3 = Math.abs(Math.round(generateBivariateNormal(5, 30)));

//animation start function
function start(event) {
    if (bAnimate) {
        event.currentTarget.gotoAndPlay("scratch");
        switch (event.currentTarget.x) {
            case 0:
                jQuery("#scratch").append('<input type="hidden" name="discount" value="' + nDoor1 + '"/>');
                break;

            case 300:
                jQuery("#scratch").append('<input type="hidden" name="discount" value="' + nDoor2 + '"/>');
                break;

            case 600:
                jQuery("#scratch").append('<input type="hidden" name="discount" value="' + nDoor3 + '"/>');
                break;
        }
        bAnimate = false;
    }
}
//animation end function
function end() {
    this.stop();
}

//generate a normal distribution around a mean courtesy Andy Novocin
function generateStandardBivariateNormal() {
    var x1 = Math.random();
    var z1 = Math.sqrt(-2 * Math.log(x1)) * Math.cos(2 * Math.PI * x1);
    return z1;
}

function generateBivariateNormal(mean, variance) {
    var zs = generateStandardBivariateNormal();
    zs = zs * Math.sqrt(variance) + mean;
    return zs;
}

jQuery(document).ready(function () {
    //make stage
    jQuery("#scratch").submit(function () {
        jQuery("#scratch").append('<input type="hidden" name="phone" value="' + jQuery.url().param("phone") + '"/>');
        jQuery("#scratch").append('<input type="hidden" name="amount" value="' + jQuery.url().param("amount") + '"/>');
    });


    var oStage = new createjs.Stage(jQuery("#scratchoff")[0]);
    //define basis of animation
    var oData = {
        images: ["scratchoffsheet.png"],
        frames: {
            width: 200,
            height: 200
        },
        animations: {
            stop: 0,
            scratch: [0, 23]
        }
    };
    var oSpriteSheet = new createjs.SpriteSheet(oData);

    //create %s

    var oDoor1 = new createjs.Text(nDoor1 + " % off!", "30px Arial", "#ff7700");
    var oDoor2 = new createjs.Text(nDoor2 + " % off!", "30px Arial", "#ff7700");
    var oDoor3 = new createjs.Text(nDoor3 + " % off!", "30px Arial", "#ff7700");
    oDoor1.y = oDoor2.y = oDoor3.y = 50;
    oDoor1.x = 50;
    oDoor2.x = 350;
    oDoor3.x = 650;
    oStage.addChild(oDoor1);
    oStage.addChild(oDoor2);
    oStage.addChild(oDoor3);

    //create 3 instances of animation to cover %s
    var oAnimation1 = new createjs.Sprite(oSpriteSheet, "stop");
    oStage.addChild(oAnimation1);
    oAnimation1.addEventListener("click", start);
    oAnimation1.on("animationend", end);
    //instance 2
    var oAnimation2 = new createjs.Sprite(oSpriteSheet, "stop");
    oStage.addChild(oAnimation2);
    oAnimation2.addEventListener("click", start);
    oAnimation2.on("animationend", end);
    oAnimation2.x = oDoor2.x - 50;
    //instance 3
    var oAnimation3 = new createjs.Sprite(oSpriteSheet, "stop");
    oStage.addChild(oAnimation3);
    oAnimation3.addEventListener("click", start);
    oAnimation3.on("animationend", end);
    oAnimation3.x = oDoor3.x - 50

    //have stage be updated on each clock tick
    createjs.Ticker.addEventListener("tick", oStage);

});
