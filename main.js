$(document).ready(function(){
		var possibilities=[[0,4,8],[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6]];
		var player1="";
		var player2="";
		var player1WinCount=0;
		var player2WinCount=0;
		var player1PlayedMoves=[];
		var player2PlayedMoves=[];
		var player1Name="Player-1";
		var player2Name="Player-2";
		var starter=1;
		$("#current").html(player1Name);
		init();

		$("#game-button").on('click',function(){
			$("#current").html(player1Name);
			endingGame("",null);
			init();
		});
		function init(){
			player1="cross";
			player2="circle";
			player1PlayedMoves=[];
			player2PlayedMoves=[];
			starter=1;
			updateScoreBoard();
			$("div[index='0']").on('click',{Index:'0'},clickIndex);

			$("div[index='1']").on('click',{Index:'1'},clickIndex);
				
			$("div[index='2']").on('click',{Index:'2'},clickIndex);

			$("div[index='3']").on('click',{Index:'3'},clickIndex);

			$("div[index='4']").on('click',{Index:'4'},clickIndex);

			$("div[index='5']").on('click',{Index:'5'},clickIndex);

			$("div[index='6']").on('click',{Index:'6'},clickIndex);

			$("div[index='7']").on('click',{Index:'7'},clickIndex);

			$("div[index='8']").on('click',{Index:'8'},clickIndex);
		}

		function clickIndex(event){
			index=event.data.Index;
			$("#current").html(starter%2+1);
			if(starter%2==0){
				$("#current").html(player2Name);
				player2PlayedMoves.push(index);
				if(player2 == "cross" ) {
					$("<img src='cross.PNG'>").appendTo(this);
				}
				else{
					$("<img src='circle.PNG'>").appendTo(this);
				}
			}
			else {
				$("#current").html(player1Name);
				player1PlayedMoves.push(index);
				if(player1 == "cross"){
					$("<img src='cross.PNG'>").appendTo(this);
				}
				else{
					$("<img src='circle.PNG'>").appendTo(this);
				}
			}
			var flag = checkForPoint();
			if(flag != null){
				if(flag.winner == "1"){
					var div ="div[index='"+parseInt(index)+"']";
					$(div).off("click");
					endingGame("1",flag.grid);
					player1WinCount++;
					updateScoreBoard();
					init();
				}
				else {
					var div ="div[index='"+parseInt(index)+"']";
					$(div).off("click");
					endingGame("2",flag.grid);
					player2WinCount++;
					updateScoreBoard();
					init();
				}
			}
			else{
				starter++;
				var div ="div[index='"+parseInt(index)+"']";
				$(div).off("click");
				if(starter == 10){
					player1WinCount++;
					player2WinCount++;
					alert("No result");
					endingGame("",null);
					updateScoreBoard();
					init();
				}
			}
		}
	

		function checkForPoint(){
			if(starter>=5){
				for(var i=0; i<possibilities.length;i++){
					var count=0;
					for(var j=0;j<player1PlayedMoves.length;j++){
						if(possibilities[i].includes(parseInt(player1PlayedMoves[j]))){
							count++;
						}
						if(count==3){
							alert(player1Name+" has won.");
							return {winner:"1",grid:possibilities[i]};
						}
					}
				}
				for(var i=0; i<possibilities.length;i++){
					var count=0;
					for(var j=0;j<player2PlayedMoves.length;j++){
						if(possibilities[i].includes(parseInt(player2PlayedMoves[j]))){
							count++;
						}
						if(count==3){
							alert(player2Name+" has won.");
							return {winner:"2",grid:possibilities[i]};
						}
					}
				}

			}
		}

		function endingGame(winnerPlayer,winnerGrid){
			//winning-grid
			$("img").remove();
			$("div[index='0']").off();
			$("div[index='1']").off();
			$("div[index='2']").off();
			$("div[index='3']").off();
			$("div[index='4']").off();
			$("div[index='5']").off();
			$("div[index='6']").off();
			$("div[index='7']").off();
			$("div[index='8']").off();
		}

		$("#submitName").on('click',function(event){
			player1Name = $("#player1NameNew").val();
			player2Name = $("#player2NameNew").val();
			console.log(player1Name);
			console.log(player2Name);
			event.preventDefault();
			$("#current").html(player1Name);
			$("#closeModal").trigger('click');
			console.log("reached here");
			player1WinCount = 0;
			player2WinCount = 0;
			endingGame("",null);
			updateScoreBoard();
			init();
		});

		function updateScoreBoard(){
			$("#player1Name").html(player1Name);
			$("#player2Name").html(player2Name);
			$("#player1count").html(player1WinCount);
			$("#player2count").html(player2WinCount);

			if(player1WinCount > player2WinCount)
				$("#leader").html("<h2>"+player1Name+" has a lead of-"+(player1WinCount-player2WinCount)+"</h2>");
			else if(player1WinCount < player2WinCount)
				$("#leader").html("<h2>"+player2Name+" has a lead of-"+(player2WinCount-player1WinCount)+"</h2>");
			else
				$("#leader").html("Scores level");
		}
	});