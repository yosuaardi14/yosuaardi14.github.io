var batasAtas = 0;
var batasKiri = 0;
var batasKanan = canvas.width;
var batasBawah = canvas.height;
var groundBlock = new Block(0, canvas.height-20, canvas.width, 20);

levelDB={
	1:{
		"block":{
			1:new Block(0, 100, canvas.width-100, 20),
			2:new Block(500, 225, canvas.width-500, 20),
			3:new Block(0, 350, canvas.width-500, 20),
			4:new Block(500, 450, canvas.width-500, 20),
		},
		"hazard":{
			1:new Hazard(canvas.width-80, batasBawah-500, 30, 20, "bottom")
		},
		"char":{
			x:0.1*canvas.width,
			y:50,
			vx:0,
			vy:0
		},
		"finish":new Finish(canvas.width-50, canvas.height-70, 50, 50),
		"enemy":{
			1:{
				"type":new Enemy(30,30),
				"x":400,
				"y": batasBawah-50,
				"speed":2,
				"awal":batasKiri+100, 
				"akhir":batasKanan-50
			},
			2:{
				"type":new Enemy(30,30),
				"x":500,
				"y":195,
				"speed":2,
				"awal":500, 	
				"akhir":batasKanan-30
			},
			3:{
				"type":new Enemy(30,30),
				"x":0,
				"y":320,
				"speed":1,
				"awal":0, 	
				"akhir":canvas.width-500
			},
			4:{
				"type":new Enemy(30,30),
				"x":500,
				"y":420,
				"speed":2,
				"awal":500, 	
				"akhir":batasKanan-30
			}
		}
	},
	2:{
		"block":{
			1:new Block(100, 100, canvas.width-200, 20),
			2:new Block(680, 200, 320, 20),
		},
		"hazard":{
			1:new Hazard(0.5*canvas.width, 200, 60, 20, "bottom"),
			2:new Hazard(0.5*canvas.width+60, 200, 60, 20, "bottom"),
			3:new Hazard(0.5*canvas.width+120, 200, 60, 20, "bottom")
		},
		"char":{
			x:0.1*canvas.width,
			y:50,
			vx:0,
			vy:0
		},
		"finish":new Finish(canvas.width-50, canvas.height-70, 50, 50),
		"enemy":{
			1:{
				"type":new Enemy(30,30),
				"x":400,
				"y": groundBlock.y-30,
				"speed":1,
				"awal":batasKiri+200, 
				"akhir":batasKanan-50
			},
			2:{
				"type":new Enemy(30,30),
				"x":400,
				"y":70,
				"speed":2,
				"awal":batasKiri+50, 	
				"akhir":batasKanan-200
			}
		},
		"stomper":{
			1:{
				"type":new Stomper(50,50),
				"x":400,
				"y":500,
				"speed":2,
				"awal":200,
				"akhir":groundBlock.y
			},
			2:{
				"type":new Stomper(50,50),
				"x":550,
				"y":500,
				"speed":3,
				"awal":200,
				"akhir":groundBlock.y
			},
			3:{
				"type":new Stomper(50,50),
				"x":700,
				"y":500,
				"speed":4,
				"awal":200,
				"akhir":groundBlock.y
			},
			4:{
				"type":new Stomper(50,50),
				"x":850,
				"y":500,
				"speed":5,
				"awal":200,
				"akhir":groundBlock.y
			},
		},
		"scatter":{
			1:{
				"type":new Scatter(75,75),
				"x":500,
				"y":500,
				"pusatX":150, 
				"pusatY":350,
				"range":150
			}
		}
	},
	3:{
		"block":{
			1:new Block(700, 480, 250, 20)
		},
		"hazard":{
			1:new Hazard(280, 570, 60, 20, "bottom"),
			2:new Hazard(340, 570, 60, 20, "bottom"),
			3:new Hazard(400, 570, 60, 20, "bottom"),
			4:new Hazard(780, 570, 60, 20, "bottom"),
			5:new Hazard(840, 570, 60, 20, "bottom"),
			6:new Hazard(900, 570, 60, 20, "bottom")
		},
		"char":{
			x:20,
			y:50,
			vx:0,
			vy:0
		},
		"finish":new Finish(canvas.width-100, 430, 50, 50),
	
		"enemy":{
			1:{
				"type":new Enemy(30,30),
				"x":400,
				"y": groundBlock.y-30,
				"speed":1,
				"awal":batasKiri+200, 
				"akhir":batasKanan-50
			},
			2:{
				"type":new Enemy(30,30),
				"x":700,
				"y":450,
				"speed":1,
				"awal":700, 
				"akhir":batasKanan-100
			}
		},
		"stomper":{
			1:{
				"type":new Stomper(50,50),
				"x":850,
				"y":400,
				"speed":5,
				"awal":200,
				"akhir":480
			}
		},
		"scatter":{
			1:{
				"type":new Scatter(85,85),
				"x":500,
				"y":500,
				"pusatX":150, 
				"pusatY":350,
				"range":150
			},
			2:{
				"type":new Scatter(85,85),
				"x":500,
				"y":500,
				"pusatX":500, 
				"pusatY":350,
				"range":150
			}
		}
	},
	4:{
		"block":{
			1:new Block(0, 300,300, 20),
			2:new Block(680, 300, 100, 20),
			3:new Block(680, 380, 320, 20)
		},
		"moveBlock":{
			1:{
				"type":new MoveB(300,300,100,20),
				"speed":1,
				"awal":batasKiri+300, 
				"akhir":680,
				"arah":"x"
			},
			2:{
				"type":new MoveB(0,480,200,20),
				"speed":1,
				"awal":batasKiri, 
				"akhir":850,
				"arah":"x"
			}
		},
		"hazard":{
			1:new Hazard(0	, 570, 60, 20, "bottom"),
			2:new Hazard(65	, 570, 60, 20, "bottom"),
			3:new Hazard(130, 570, 60, 20, "bottom"),
			4:new Hazard(195, 570, 60, 20, "bottom"),
			5:new Hazard(260, 570, 60, 20, "bottom"),
			6:new Hazard(325, 570, 60, 20, "bottom"),
			7:new Hazard(390, 570, 60, 20, "bottom"),
			8:new Hazard(455, 570, 60, 20, "bottom"),
			9:new Hazard(510, 570, 60, 20, "bottom"),
			10:new Hazard(575, 570, 60, 20, "bottom"),
			11:new Hazard(640, 570, 60, 20, "bottom"),
			12:new Hazard(705, 570, 60, 20, "bottom"),
			13:new Hazard(300, 320, 60, 20, "bottom"),
			14:new Hazard(365, 320, 60, 20, "bottom"),
			15:new Hazard(430, 320, 60, 20, "bottom"),
			16:new Hazard(495, 320, 60, 20, "bottom"),
			17:new Hazard(560, 320, 60, 20, "bottom"),
			18:new Hazard(625, 320, 60, 20, "bottom")
		},
		"char":{
			x:0,
			y:50,
			vx:10,
			vy:0
		},
		"finish":new Finish(canvas.width-50, canvas.height-70, 50, 50),
	
		"enemy":{
			1:{
				"type":new Enemy(30,30),
				"x":800,
				"y": groundBlock.y-30,
				"speed":1,
				"awal":800, 
				"akhir":batasKanan-50
			},
			2:{
				"type":new Enemy(30,30),
				"x":50,
				"y":270,
				"speed":2,
				"awal":50, 
				"akhir":300
			}
		},
		"stomper":{
			1:{
				"type":new Stomper(50,50),
				"x":620,
				"y":200,
				"speed":2,
				"awal":0,
				"akhir":300
			}
		},
		"scatter":{
			1:{
				"type":new Scatter(75,75),
				"x":500,
				"y":500,
				"pusatX":750, 
				"pusatY":500,
				"range":0
			},
		}
	},
	5:{
		"block":{
			1:new Block(300, 200,300, 20),
			2:new Block(0, 560, 100, 20),
			3:new Block(680, 380, 320, 20)
		},
		"moveBlock":{
			1:{
				"type":new MoveB(500,300,100,20),
				"speed":1,
				"awal":500, 
				"akhir":850,
				"arah":"x"
			},
			2:{
				"type":new MoveB(100,480,200,20),
				"speed":1,
				"awal":200, 
				"akhir":580,
				"arah":"y"
			},
			3:{
				"type":new MoveB(500,480,100,20),
				"speed":2,
				"awal":500, 
				"akhir":750,
				"arah":"x"
			}
		},
		"hazard":{
			1:new Hazard(325, 570, 60, 20, "bottom"),
			2:new Hazard(390, 570, 60, 20, "bottom"),
			3:new Hazard(455, 570, 60, 20, "bottom"),
			4:new Hazard(510, 570, 60, 20, "bottom"),
			5:new Hazard(575, 570, 60, 20, "bottom"),
			6:new Hazard(640, 570, 60, 20, "bottom"),
			7:new Hazard(705, 570, 60, 20, "bottom")
		},
		"char":{
			x:0,
			y:50,
			vx:10,
			vy:0
		},
		"finish":new Finish(canvas.width-50, canvas.height-70, 50, 50),

		"enemy":{
			1:{
				"type":new Enemy(30,30),
				"x":800,
				"y": groundBlock.y-30,
				"speed":1,
				"awal":800, 
				"akhir":batasKanan-50
			},
			2:{
				"type":new Enemy(30,30),
				"x":300,
				"y":170,
				"speed":2,
				"awal":300, 
				"akhir":600
			}
		},
		"scatter":{
			1:{
				"type":new Scatter(75,75),
				"x":500,
				"y":500,
				"pusatX":750, 
				"pusatY":500,
				"range":0
			},
		}
	},
	6:{
		"block":{
			1:new Block(300, 200,600, 20),
			2:new Block(0, 200, 100, 20),
			3:new Block(360, 50, 650, 20)
		},
		"moveBlock":{
			1:{
				"type":new MoveB(300,450,500,20),
				"speed":2,
				"awal":300, 
				"akhir":900,
				"arah":"x"
			},
			2:{
				"type":new MoveB(100,480,200,20),
				"speed":1,
				"awal":0, 
				"akhir":580,
				"arah":"y"
			},
			3:{
				"type":new MoveB(900,480,100,20),
				"speed":1,
				"awal":100, 
				"akhir":580,
				"arah":"y"
			}
		},
		"hazard":{
			1:new Hazard(0	, 570, 60, 20, "bottom"),
			2:new Hazard(65	, 570, 60, 20, "bottom"),
			3:new Hazard(130, 570, 60, 20, "bottom"),
			4:new Hazard(195, 570, 60, 20, "bottom"),
			5:new Hazard(260, 570, 60, 20, "bottom"),
			6:new Hazard(325, 570, 60, 20, "bottom"),
			7:new Hazard(390, 570, 60, 20, "bottom"),
			8:new Hazard(455, 570, 60, 20, "bottom"),
			9:new Hazard(510, 570, 60, 20, "bottom"),
			10:new Hazard(575, 570, 60, 20, "bottom"),
			11:new Hazard(640, 570, 60, 20, "bottom"),
			12:new Hazard(705, 570, 60, 20, "bottom"),
			13:new Hazard(770, 570, 60, 20, "bottom"),
			14:new Hazard(835, 570, 60, 20, "bottom"),
			15:new Hazard(900, 570, 60, 20, "bottom"),
			16:new Hazard(965, 570, 60, 20, "bottom")
		},
		"char":{
			x:0,
			y:50,
			vx:10,
			vy:0
		},
		"finish":new Finish(370,150, 50, 50),
	
		"enemy":{
			1:{
				"type":new Enemy(30,30),
				"x":420,
				"y": 170,
				"speed":3,
				"awal":420, 
				"akhir":900
			},
		},
		"scatter":{
			1:{
				"type":new Scatter(60,60),
				"x":200,
				"y":200,
				"pusatX":300, 
				"pusatY":0,
				"range":0
			},
			2:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":300, 
				"pusatY":70,
				"range":0
			},
			3:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":300, 
				"pusatY":140,
				"range":0
			},
		}
	},
	7:{
		"block":{
			1:new Block(0, 100, 200, 20),
			2:new Block(300, 100, 300, 20),
			3:new Block(700, 100, 300, 20),
			4:new Block(500, 225, 350, 20),
			5:new Block(600, 350, 150, 20),
			6:new Block(800, 350, 30, 20)
		},
		"moveBlock":{
			1:{
				"type":new MoveB(300,350,100,20),
				"speed":2,
				"awal":0, 
				"akhir":600,
				"arah":"x"
			},
			2:{
				"type":new MoveB(300,220,50,20),
				"speed":3,
				"awal":0, 
				"akhir":500,
				"arah":"x"
			},
			3:{
				"type":new MoveB(900,350,100,20),
				"speed":1,
				"awal":150, 
				"akhir":batasBawah-25,
				"arah":"y"
			},
			4:{
				"type":new MoveB(300,550,50,20),
				"speed":1,
				"awal":0, 
				"akhir":batasKanan-100,
				"arah":"x"
			},
			5:{
				"type":new MoveB(300,450,150,20),
				"speed":2,
				"awal":0, 
				"akhir":batasKanan-100,
				"arah":"x"
			}
		},
		"hazard":{
			1:new Hazard(0, groundBlock.y-5, 100, 30, "bottom"),
			2:new Hazard(100, groundBlock.y-5, 100, 30, "bottom"),
			3:new Hazard(200, groundBlock.y-5, 100, 30, "bottom"),
			4:new Hazard(300, groundBlock.y-5, 100, 30, "bottom"),
			5:new Hazard(400, groundBlock.y-5, 100, 30, "bottom"),
			6:new Hazard(500, groundBlock.y-5, 100, 30, "bottom"),
			7:new Hazard(600, groundBlock.y-5, 100, 30, "bottom"),
			8:new Hazard(700, groundBlock.y-5, 100, 30, "bottom"),
			9:new Hazard(800, groundBlock.y-5, 100, 30, "bottom"),
			10:new Hazard(900, groundBlock.y-5, 100, 30, "bottom")
		},
		"char":{
			x:0.1*canvas.width,
			y:50,
			vx:0,
			vy:0
		},
		"finish":new Finish(650, 300, 50, 50),
		"enemy":{
			1:{
				"type":new Enemy(30,30),
				"x":500,
				"y":195,
				"speed":3,
				"awal":500, 	
				"akhir":800
			}
		}
	},
	8:{
		"block":{
			1:new Block(0, 100, 200, 20),
			2:new Block(900, 100, 100, 20),
			3:new Block(500, 225, 350, 20)
		},
		"moveBlock":{
			1:{
				"type":new MoveB(300,350,100,20),
				"speed":2,
				"awal":0, 
				"akhir":600,
				"arah":"x"
			},
			2:{
				"type":new MoveB(300,200,150,20),
				"speed":3,
				"awal":0, 
				"akhir":500,
				"arah":"x"
			},
			3:{
				"type":new MoveB(900,350,100,20),
				"speed":1,
				"awal":150, 
				"akhir":batasBawah-25,
				"arah":"y"
			},
			4:{
				"type":new MoveB(300,450,100,20),
				"speed":3,
				"awal":0, 
				"akhir":batasKanan-100,
				"arah":"x"
			},
			5:{
				"type":new MoveB(400,150,50,20),
				"speed":1,
				"awal":400, 
				"akhir":batasKanan-100,
				"arah":"x"
			},
		},
		"scatter":{
			1:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":0, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
			2:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":60, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
			3:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":120, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
			4:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":180, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
		},
		"hazard":{
			1:new Hazard(300, groundBlock.y-5, 100, 30, "bottom"),
			2:new Hazard(400, groundBlock.y-5, 100, 30, "bottom"),
			3:new Hazard(500, groundBlock.y-5, 100, 30, "bottom"),
			4:new Hazard(600, groundBlock.y-5, 100, 30, "bottom"),
			5:new Hazard(700, groundBlock.y-5, 100, 30, "bottom"),
			6:new Hazard(800, groundBlock.y-5, 100, 30, "bottom"),
			7:new Hazard(900, groundBlock.y-5, 100, 30, "bottom")
		},
		"char":{
			x:0.1*canvas.width,
			y:50,
			vx:0,
			vy:0
		},
		"finish":new Finish(950, 50, 50, 50),
	},
	9:{
		"block":{
			1:new Block(920, 150, 80, 20),
			2:new Block(500, 400, 350, 20)
		},
		"hazard":{
			1:new Hazard(0, batasAtas, 100, 10, "top"),
			2:new Hazard(100, batasAtas, 100, 10, "top"),
			3:new Hazard(200, batasAtas, 100, 10, "top"),
			4:new Hazard(300, batasAtas, 100, 10, "top"),
			5:new Hazard(400, batasAtas, 100, 10, "top"),
			6:new Hazard(500, batasAtas, 100, 10, "top"),
			7:new Hazard(600, batasAtas, 100, 10, "top"),
			8:new Hazard(700, batasAtas, 100, 10, "top"),
			9:new Hazard(800, batasAtas, 100, 10, "top"),
			10:new Hazard(900, batasAtas, 100, 10, "top")
		},
		"scatter":{
			1:{
				"type":new Scatter(75,75),
				"x":200,
				"y":200,
				"pusatX":250, 
				"pusatY":150,
				"range":100
			}
		},
		"enemy":{
			1:{
				"type":new Enemy(30,30),
				"x": 700,
				"y": groundBlock.y-30,
				"speed":2,
				"awal":680, 
				"akhir":900
			},
		},
		"thrower":{
			1:new Thrower(300,batasBawah, 50),
			2:new Thrower(700,350, 45)
		},
		"char":{
			x:0.1*canvas.width,
			y:50,
			vx:0,
			vy:0
		},
		"finish":new Finish(950, 100, 50, 50),
	},
	10:{
		"block":{
			1:new Block(900, 100, 100, 20),
		},
		"moveBlock":{
			1:{
				"type":new MoveB(0,350,100,20),
				"speed":2,
				"awal":30, 
				"akhir":500,
				"arah":"y"
			},
			2:{
				"type":new MoveB(150,200,100,20),
				"speed":3,
				"awal":30, 
				"akhir":500,
				"arah":"y"
			},
			3:{
				"type":new MoveB(300,350,100,20),
				"speed":4,
				"awal":30, 
				"akhir":batasBawah-50,
				"arah":"y"
			},
			4:{
				"type":new MoveB(450,450,100,20),
				"speed":2,
				"awal":30, 
				"akhir":batasBawah-50,
				"arah":"y"
			},
			5:{
				"type":new MoveB(600,150,100,20),
				"speed":3,
				"awal":30, 
				"akhir":batasBawah-50,
				"arah":"y"
			},
			6:{
				"type":new MoveB(750,150,100,20),
				"speed":4,
				"awal":30, 
				"akhir":batasBawah-50,
				"arah":"y"
			},
		},
		"scatter":{
			1:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":0, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
			2:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":60, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
			3:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":120, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
			4:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":180, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
			5:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":batasKanan-60, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
			6:{
				"type":new Scatter(60,60),
				"x":0,
				"y":0,
				"pusatX":batasKanan-120, 
				"pusatY":groundBlock.y-60,
				"range":0
			},
		},
		"hazard":{
			1:new Hazard(300, groundBlock.y-5, 100, 30, "bottom"),
			2:new Hazard(400, groundBlock.y-5, 100, 30, "bottom"),
			3:new Hazard(500, groundBlock.y-5, 100, 30, "bottom"),
			4:new Hazard(600, groundBlock.y-5, 100, 30, "bottom"),
			5:new Hazard(700, groundBlock.y-5, 100, 30, "bottom"),
			6:new Hazard(800, groundBlock.y-5, 100, 30, "bottom"),
			7:new Hazard(900, groundBlock.y-5, 100, 30, "bottom"),
			8:new Hazard(0, batasAtas, 100, 10, "top"),
			9:new Hazard(100, batasAtas, 100, 10, "top"),
			10:new Hazard(200, batasAtas, 100, 10, "top"),
			11:new Hazard(300, batasAtas, 100, 10, "top"),
			12:new Hazard(400, batasAtas, 100, 10, "top"),
			13:new Hazard(500, batasAtas, 100, 10, "top"),
			14:new Hazard(600, batasAtas, 100, 10, "top"),
			15:new Hazard(700, batasAtas, 100, 10, "top"),
			16:new Hazard(800, batasAtas, 100, 10, "top"),
			17:new Hazard(900, batasAtas, 100, 10, "top")
		},
		"char":{
			x:30,
			y:50,
			vx:0,
			vy:0
		},
		"finish":new Finish(950, 50, 50, 50),
	},
}
