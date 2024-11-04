class Sounds extends MovableObject {
	sounds = {};
	soundsAreEnabled = true;

	constructor() {
		super();
		this.sounds = {
			characterWalk: new Audio("assets/audio/character_walk.mp3"),
			characterHurt: [
				new Audio("assets/audio/character_hurt_0.mp3"),
				new Audio("assets/audio/character_hurt_0.mp3"),
			],
			characterJump: [
				new Audio("assets/audio/character_jump_0.mp3"),
				new Audio("assets/audio/character_jump_1.mp3"),
			],
			characterDeath: new Audio("assets/audio/character_dead.mp3"),
			characterWon: new Audio("assets/audio/character_won.mp3"),
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
			chickenSmallChirp: new Audio('assets/audio/chicken_small_chirp.mp3'),
			chickenDie: new Audio('assets/audio/chicken_die.mp3'), //TODO: USING?!
			bottleCollect: new Audio('assets/audio/bottle_collect.mp3'),
			bottleHit: [
				new Audio('assets/audio/bottle_hit_0.mp3'),
				new Audio('assets/audio/bottle_hit_1.mp3')
			],
			coin: new Audio("assets/audio/coin.mp3"),
			// throw: new Audio('audio/throw_bottle.mp3'),
			// bottle: new Audio('audio/bottle.mp3'),
			// hurt: new Audio('audio/character_hurt.mp3'),
			// endboss: new Audio('audio/endboss_hit.mp3')
		};
	}

	playSound(soundKey) {
		console.log(soundKey);
		if (this.soundsAreEnabled) {
			const sound = this.sounds[soundKey];
			if (sound) {
				console.log("playing: ", soundKey);
				sound.play();
			}
		}
	}
}
