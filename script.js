const result = {
  win: "WIN",
  lose: "LOSE",
  draw: "DRAW",
  jn_undefined: "UNDEFINED"
};

const message = {
  win: "あなたの勝ち！",
  lose: "あなたの負け・・・",
  draw: "あいこ！って聞くと毎回aikoが脳裏をよぎる...カブトムシ...",
  error: "本当にじゃんけんしたの？結果出てないからやり直してね"
};

function battle(myHand, cpuHand) {
  return (myHand - cpuHand + 3) % 3;
}

function judgeJankenLogic(myHand, cpuHand) {
  let _jankenLogic = battle(myHand, cpuHand);
  /* For debug */
  console.log("_jankenLogic: ", _jankenLogic);

  if (_jankenLogic === 2) {
    return result.win;
  } else if (_jankenLogic === 1) {
    return result.lose;
  } else if (_jankenLogic === 0) {
    return result.draw;
  } else {
    return result.jn_undefined;
  }
}

function customSetTimeout(sec) {
  setTimeout(function() {
    $(".result-text").html("じゃんけん");
  }, sec);
}

function outputResultText(_result) {
  if(_result === result.win) {
    console.log(message.win);
    $(".result-text").html(message.win);
  } else if(_result === result.lose) {
    console.log(message.lose);
    $(".result-text").html(message.lose);
  } else if(_result === result.draw) {
    console.log(message.draw);
    $(".result-text").html(message.draw);
  } else {
    console.log(message.error);
    $(".result-text").html(message.error);
  }
  customSetTimeout(2000);
}

$(".btn").on("click", function() {
  outputResultText(judgeJankenLogic($(this).val(), Math.ceil(Math.random() * 3)));
});
