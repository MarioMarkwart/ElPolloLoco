class Sound extends MovableObject {
	soundCache = {};
	soundIsEnabled = false;

	constructor() {
		super();
		this.loadSounds();
		this.setInitialVolume()
	}


	/**
	 * Loads all sound files into the sound cache.
	 *
	 * This function initializes the soundCache object with audio clips for various
	 * game events such as character actions, environmental sounds, and item interactions.
	 * Each key in the soundCache represents a category of sound, and the value is an array
	 * of Audio objects corresponding to the sound files for that category.
	 */
	loadSounds(){
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
			backgroundMusic: [new Audio("assets/audio/background-music.mp3")]
		};
	}


	/**
	 * Plays a random sound from the sound cache given by the soundKey.
	 * If soundIsEnabled is set to false, the sound is not played.
	 * @param {string} soundKey - The key in the soundCache object to play the sound from.
	 */
	playSound(soundKey) {
		let random = Math.floor(Math.random() * this.soundCache[soundKey].length);
		if (this.soundIsEnabled && gameRunning) {
			const sound = this.soundCache[soundKey][random];
			if (sound) {
				sound.play();
			}
		}
	}
	
	
	playSoundLoop(soundKey, timerange, obj) {
		let intv = setInterval(() => {
			this.playSound(soundKey)
		}, timerange)
		obj.soundLoopId = intv;
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
				sound.currentTime = 0;
			});
		}
	}


	/**
	 * Stops all sounds and sets the volume of all sounds to 0.
	 * This function should be called when the game is stopped or paused.
	 */
	stopAllSounds() {
		Object.keys(this.soundCache).forEach((sound) => {
			this.stopSound(sound);
			this.setVolume(this.soundCache[sound], 0);
		});
	}


	/**
	 * Sets the image of the sound button in the top right corner of the game
	 * to either the sound on or sound off image, depending on the value of
	 * soundIsEnabled.
	 */
	setSoundButton() {
		let soundBtn = document.getElementById('btn-sound');

		this.soundIsEnabled
			? soundBtn.src = 'assets/img/buttons/sound_on.png'
			: soundBtn.src = 'assets/img/buttons/sound_off.png';
	}


	/**
	 * Sets the volume of the given array of audio elements to the given volume.
	 *
	 * @param {HTMLAudioElement[]} arr - The array of audio elements to set the volume for.
	 * @param {number} volume - The volume to set for each audio element in the array.
	 */
	setVolume(arr, volume) {
		for (let i = 0; i < arr.length; i++) {
			arr[i].volume = volume
		}
	}


	/**
	 * Sets the initial volume for various sounds in the sound cache.
	 *
	 * This function assigns specific volume levels to different sound categories
	 * such as character actions, environmental sounds, and item interactions.
	 * Each sound category is mapped to a predefined volume level to balance the
	 * audio experience in the game.
	 */
	setInitialVolume() {
		this.setVolume(this.soundCache.characterWalk, 0.6);
		this.setVolume(this.soundCache.characterHurt, 0.3);
		this.setVolume(this.soundCache.characterJump, 0.3);
		this.setVolume(this.soundCache.characterKill, 0.4);
		this.setVolume(this.soundCache.characterWon, 0.4);
		this.setVolume(this.soundCache.characterLost, 0.3);
		this.setVolume(this.soundCache.chickenChirp, 0.3);
		this.setVolume(this.soundCache.chickenSmallChirp, 0.3);
		this.setVolume(this.soundCache.endbossHit, 0.3);
		this.setVolume(this.soundCache.bottleCollect, 0.2);
		this.setVolume(this.soundCache.bottleHit, 0.2);
		this.setVolume(this.soundCache.coinCollect, 0.4);
		this.setVolume(this.soundCache.backgroundMusic, 0.1);
	}
}