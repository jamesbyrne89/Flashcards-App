// JavaScript Document
window.onload = function() {
    console.log("Junior developer test.");

    // declare your variables here.
    var background;
    var skyLogo;
    var frameOneTextPrimary;
    var frameOneTextSecondary;
    var mAndS;
    var samsung;
    var frameTwoTextPrimary;
    var grabber;
    var frameTwoTerms;
    var CTA;
    var frameThreeTextPrimary;
    var frameThreeTextSecondary;
    var frameThreeTerms;
    var frameThreeTextTertiary;
    var backgroundEnd;
    var bounce;
    var sheen;
    // store a reference to the canvas which we will draw on.
    var stage = new createjs.Stage("banner");

    // register the stage to handle mouse events. 
    stage.enableMouseOver(10);

    // register the Ticker to listen for the tick event.
    createjs.Ticker.addEventListener("tick", handleTick, false);

    // redraw the canvas - like Event.ENTER_FRAME in Adobe Flash.
    function handleTick(event) {
        stage.update();
    }

    // create a preloader to load the images.
    var loader = new createjs.LoadQueue(false);

    // when all images are loaded call the handleAllImageLoaded function.
    loader.on('complete', handleAllImagesLoaded, this);

    // provide a manifest of files and ids to be loaded.
    loader.loadManifest([{
            id: "background",
            src: "images/background.png"
        },
        {
            id: "skyLogo",
            src: "images/Sky_glassmark_multicoloured_CMYK_Large.png"
        },
        {
            id: "frameOneTextPrimary",
            src: "images/frame-1-text-1.png"
        },
        {
            id: "frameOneTextSecondary",
            src: "images/frame-1-text-2.png"
        },
        {
            id: "mAndS",
            src: "images/MandS.png"
        },
        {
            id: "samsung",
            src: "images/samsung.png"
        },
        {
            id: "stamp",
            src: "images/BB_Sale_12MF_Sky_UL_Stamp.png"
        },
        {
            id: "frameTwoTextPrimary",
            src: "images/When-you-join-Sky-with.png"
        },
        {
            id: "grabber",
            src: "images/grabber_1.png"
        },
        {
            id: "frameTwoTerms",
            src: "images/frame-2-terms.png"
        },
        {
            id: "CTA",
            src: "images/CTA.png"
        },
        {
            id: "frameThreeTextPrimary",
            src: "images/frame-3-text-1.png"
        },
        {
            id: "frameThreeTextSecondary",
            src: "images/frame-3-text-2.png"
        },
        {
            id: "frameThreeTextTertiary",
            src: "images/frame-3-text-3.png"
        },
        {
            id: "frameThreeTerms",
            src: "images/frame-3-terms.png"
        },
        {
            id: "backgroundEnd",
            src: "images/bg.png"
        },
    ]);

    function handleAllImagesLoaded() {
        console.log("All the images have loaded.");
        drawTheBannerBackground();
    }

    function drawTheBannerBackground() {
        console.log("draw and animate the background.");

        // provide the loader result for the item with id == 'background'
        // as a bitmap which will be stored in our background variable.
        background = new createjs.Bitmap(loader.getResult("background"));

        // set the background bitmap alpha to zero.
        background.alpha = 0;

        // add background to the display list.
        stage.addChild(background);

        // animate the background bitmap alpha value to 1 over the duration of 1000 milliseconds.
        createjs.Tween.get(background).to({
            alpha: 1
        }, 1000);

        // after the background is drawn on the canvas draw and animate the content for frame 1.
        setTimeout(frame1, 100);


    }

    function frame1() {
        console.log("draw and animate frame one.");

        skyLogo = new createjs.Bitmap(loader.getResult("skyLogo"));
        frameOneTextPrimary = new createjs.Bitmap(loader.getResult("frameOneTextPrimary"));
        frameOneTextSecondary = new createjs.Bitmap(loader.getResult("frameOneTextSecondary"));
        mAndS = new createjs.Bitmap(loader.getResult("mAndS"));
        samsung = new createjs.Bitmap(loader.getResult("samsung"));
        // refer to the creative brief, frame 1 for guidance.
        stage.addChild(skyLogo);
        skyLogo.x = 15;
        skyLogo.y = 210;

        stage.addChild(frameOneTextPrimary);
        frameOneTextPrimary.x = 45;
        frameOneTextPrimary.y = 20;
        frameOneTextPrimary.alpha = 0;
        createjs.Tween.get(frameOneTextPrimary).to({
                alpha: 1
            }, 1000)
            .wait(2750)
            .to({
                alpha: 0
            }, 500);

        stage.addChild(frameOneTextSecondary);
        frameOneTextSecondary.x = 56;
        frameOneTextSecondary.y = 45;
        frameOneTextSecondary.alpha = 0;
        createjs.Tween.get(frameOneTextSecondary)
            .wait(750)
            .to({
                alpha: 1
            }, 1000)
            .wait(2000)
            .to({
                alpha: 0
            }, 500);
        stage.addChild(mAndS);
        mAndS.x = 160;
        mAndS.y = 115;
        createjs.Tween.get(mAndS).to({
                alpha: 1
            })
            .wait(3750)
            .to({
                alpha: 0
            }, 500);
        stage.addChild(samsung);
        samsung.x = 55;
        samsung.y = 115;
        createjs.Tween.get(samsung).to({
                alpha: 1
            })
            .wait(3750)
            .to({
                alpha: 0
            }, 500);
        // after a timeout and the animations have completed, draw frame 2.
        setTimeout(frame2, 5000);
    }

    function frame2() {
        console.log("draw and animate frame two.");
        stamp = new createjs.Bitmap(loader.getResult("stamp"));
        frameTwoTextPrimary = new createjs.Bitmap(loader.getResult("frameTwoTextPrimary"));
        grabber = new createjs.Bitmap(loader.getResult("grabber"));
        frameTwoTerms = new createjs.Bitmap(loader.getResult("frameTwoTerms"));
        // refer to the creative brief, frame 2 for guidance.


        stage.addChild(frameTwoTextPrimary);
        frameTwoTextPrimary.x = 40;
        frameTwoTextPrimary.y = 30;
        frameTwoTextPrimary.alpha = 0;
        createjs.Tween.get(frameTwoTextPrimary).to({
                alpha: 1
            }, 1000)
            .wait(3500)
            .to({
                alpha: 0
            }, 500)


        stage.addChild(frameTwoTerms);
        frameTwoTerms.x = 120;
        frameTwoTerms.y = 220;
        frameTwoTerms.alpha = 0;
        createjs.Tween.get(frameTwoTerms)
            .wait(1000)
            .to({
                alpha: 1
            }, 1000)
            .wait(2500)
            .to({
                alpha: 0
            }, 500)

        stamp.x = 71;
        stamp.y = -140;

        stage.addChild(stamp);

        stage.addChild(grabber);
        grabber.x = 110;
        grabber.y = -70;
        grabber.alpha = 0;
        createjs.Tween.get(grabber).to({
                alpha: 1
            }, 1000)
            .wait(1000)
            .to({
                y: 0
            }, 500)
            .wait(2000)
            .to({
                alpha: 0
            }, 500)
        bounce =
            createjs.Tween.get(stamp, {
                loop: false
            })
            .wait(1000)
            .to({
                x: 71,
                y: 67
            }, 1000, createjs.Ease.bounceOut)
            .wait(2500)
            .to({
                alpha: 0
            }, 500)

        createjs.Tween.get(background)
            .wait(4500)
            .to({
                alpha: 0
            }, 1000)

        // after a timeout and the animations have completed, draw frame 3.
        setTimeout(frame3, 5000);
    }

    function frame3() {
        console.log("draw and animate frame three.");

        backgroundEnd = new createjs.Bitmap(loader.getResult("backgroundEnd"));
        skyLogo = new createjs.Bitmap(loader.getResult("skyLogo"));
        CTA = new createjs.Bitmap(loader.getResult("CTA"));
        frameThreeTextPrimary = new createjs.Bitmap(loader.getResult("frameThreeTextPrimary"));
        frameThreeTextSecondary = new createjs.Bitmap(loader.getResult("frameThreeTextSecondary"));
        frameThreeTextTertiary = new createjs.Bitmap(loader.getResult("frameThreeTextTertiary"));
        frameThreeTerms = new createjs.Bitmap(loader.getResult("frameThreeTerms"));


        function goURL() {
            location.assign('https://www.sky.com');
        }



        stage.addChild(backgroundEnd);
        backgroundEnd.alpha = 0;
        createjs.Tween.get(backgroundEnd)
            .to({
                alpha: 1
            }, 1000)

        stage.addChild(skyLogo);
        skyLogo.x = 15;
        skyLogo.y = 210;

        stage.addChild(CTA);
        CTA.x = 145;
        CTA.y = banner.height - 48;
        CTA.addEventListener("click", goURL);
        CTA.cursor = 'pointer';

        rectangle = new createjs.Shape();
        rectangle.graphics.beginLinearGradientFill(
                ["rgba(255, 255, 255, 0.2)",
                    "rgba(255, 255, 255, 0.2)",
                    "rgba(255, 255, 255, 0.9)",
                    "rgba(255, 255, 255, 0.0)"
                ], [0, .37, .45, 1], 0, 0, 20, 0)
            .drawRect(0, 0, 25, 45);
        rectangle.x = 110;
        rectangle.y = banner.height - 52;
        rectangle.rotation = 20;
        rectangle.alpha = 0.8;

        stage.addChild(rectangle);

        var sheen =
            createjs.Tween.get(rectangle, {
                loop: false
            })
            .wait(3500)
            .to({
                x: 285
            }, 750)
            .to({
                alpha: 0
            }, 200)

        stage.addChild(frameThreeTextPrimary);
        frameThreeTextPrimary.x = 10;
        frameThreeTextPrimary.y = 30;
        frameThreeTextPrimary.alpha = 0;
        createjs.Tween.get(frameThreeTextPrimary).to({
            alpha: 1
        }, 1000)

        stage.addChild(frameThreeTextSecondary);
        frameThreeTextSecondary.x = 40;
        frameThreeTextSecondary.y = 84;
        frameThreeTextSecondary.alpha = 0;
        createjs.Tween.get(frameThreeTextSecondary)
            .wait(750)
            .to({
                alpha: 1
            }, 1000)

        stage.addChild(frameThreeTextTertiary);
        frameThreeTextTertiary.x = 74;
        frameThreeTextTertiary.y = 140;
        frameThreeTextTertiary.alpha = 0;
        createjs.Tween.get(frameThreeTextTertiary)
            .wait(1500)
            .to({
                alpha: 1
            }, 1000)

        stage.addChild(frameThreeTerms);
        frameThreeTerms.x = 80;
        frameThreeTerms.y = 185;
        frameThreeTerms.alpha = 0;
        createjs.Tween.get(frameThreeTerms)
            .wait(2250)
            .to({
                alpha: 1
            }, 1000)
        // refer to the creative brief, frame 3 for guidance.
    }

};