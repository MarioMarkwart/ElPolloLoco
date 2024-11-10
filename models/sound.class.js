class Sound extends MovableObject {
	soundCache = {};
	soundIsEnabled = false;

	constructor() {
		super();
		this.soundCache = {
			characterWalk: [new Audio("assets/audio/character_walk.mp3")],
			characterHurt: [
				new Audio("assets/audio/character_hurt_0.mp3"),
				new Audio("assets/audio/character_hurt_1.mp3"),
			],
			characterJump: [
				new Audio("assets/audio/character_jump_0.mp3"),
				new Audio("assets/audio/character_jump_1.mp3"),
			],
			characterWon: [new Audio("assets/audio/character_won.mp3")],
			characterLost: [new Audio("assets/audio/character_dead.mp3")],
			characterKill: [
				new Audio("assets/audio/character_enemy_kill_0.mp3"),
				new Audio("assets/audio/character_enemy_kill_1.mp3"),
			],
			chickenChirp: [
				new Audio("assets/audio/chicken_chirp_0.mp3"),
				new Audio("assets/audio/chicken_chirp_1.mp3"),
				new Audio("assets/audio/chicken_chirp_2.mp3"),
				new Audio("assets/audio/chicken_chirp_3.mp3"),
				new Audio("assets/audio/chicken_chirp_4.mp3"),
				new Audio("assets/audio/chicken_chirp_5.mp3"),
			],
			chickenSmallChirp: [
				new Audio("assets/audio/chicken_small_chirp.mp3"),
			],
			endbossHit: [new Audio("assets/audio/endboss_hit.mp3")],
			bottleCollect: [new Audio("assets/audio/bottle_collect.mp3")],
			bottleHit: [
				new Audio("assets/audio/bottle_hit_0.mp3"),
				new Audio("assets/audio/bottle_hit_1.mp3"),
			],
			coinCollect: [new Audio("assets/audio/coin.mp3")],

		};
	}


	/**
	 * Plays a random sound from the sound cache given by the soundKey.
	 * If soundIsEnabled is set to false, the sound is not played.
	 * @param {string} soundKey - The key in the soundCache object to play the sound from.
	 */
	playSound(soundKey) {
		let random = Math.floor(Math.random() * this.soundCache[soundKey].length);
		if (this.soundIsEnabled) {
			const sound = this.soundCache[soundKey][random];
			if (sound) {
				sound.play();
			}
		}
	}


/**
 * Stops all sounds associated with the given soundKey.
 * 
 * This function iterates over the array of sounds corresponding to the provided
 * soundKey in the soundCache, and pauses each sound if soundIsEnabled is true.
 * 
 * @param {string} soundKey - The key in the soundCache object whose sounds are to be stopped.
 */
	stopSound(soundKey) {
		if (this.soundIsEnabled) {
			this.soundCache[soundKey].forEach((sound) => {
				sound.pause();
			});
		}
	}


/**
 * Stops all sounds from the sound cache.
 * 
 * This function iterates over all sound keys in the soundCache and stops each sound
 * by invoking the stopSound method. It logs 'all sounds stop' to the console when called.
 * This ensures that all currently playing sounds are paused.
 */
	stopAllSounds(){
		console.log('all sounds stop')
		Object.keys(this.soundCache).forEach((sound) => {
			this.stopSound(sound);
		});
	}


	/**
	 * Sets the image of the sound button in the top right corner of the game
	 * to either the sound on or sound off image, depending on the value of
	 * soundIsEnabled.
	 */
	setSoundButton(){
		let soundBtn = document.getElementById('btn-sound');
	
		this.soundIsEnabled 
		? soundBtn.src = 'assets/img/buttons/sound_on.png'
		: soundBtn.src = 'assets/img/buttons/sound_off.png';
	}


}

//TODO: SOUND VOLUMES!

		// this.loadSound(this.CHARACTER_WALKING_SOUND);
		// this.loadSounds(this.CHARACTER_JUMPING_SOUNDS, 0.3);
		// this.loadSounds(this.CHARACTER_HURT_SOUNDS, 0.5);
		// this.loadSounds(this.CHARACTER_KILLING_ENEMY_SOUNDS, 0.5);
		// this.loadSounds(this.CHARACTER_WON_SOUND, 0.5);
		// this.loadSounds(this.CHARACTER_DEAD_SOUND, 0.5);