import 'phaser';

export default class PreloaderScene extends Phaser.Scene{
    constructor(){
        super('Preloader');
    }

    //Is called in the very beggining:
    init () {
        this.readyCount = 0;
    }

    //Is set to be called after the timed event:
    ready () {
        this.scene.start('Title')
        this.readyCount++;
        if(this.readyCount === 2){
            this.scene.start('Title');
        }
    }

    preload(){
        //We loaded this image in the BootScene, now in this scene we will show it/ add it.
        this.add.image(400, 200, 'logo');

        //display the progress bar:
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2- 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        //update file progress text:
            //'on(fileprogress) seems to be a notable event..
        this.load.on('fileprogress', (file) => {
            assetText.setText('Loading asset: ' + file.key);
        });

        //remove progress bar when complete
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });


        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

        //Load the assets we will need for our game:
        this.load.image('blueButton1', 'src/assets/ui/blue_button02.png');
        this.load.image('blueButton2', 'src/assets/ui/blue_button03.png');
        this.load.image('phaserLogo', 'src/assets/logo.png');
        
        this.load.image('box', 'src/assets/ui/grey_box.png');
        this.load.image('checkedBox', 'src/assets/ui/blue_boxCheckmark.png');
        this.load.audio('bgMusic', ['src/assets/TownTheme.mp3'])



    }
    create(){

    }

    
};