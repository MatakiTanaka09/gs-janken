/*
  関数の基礎

  1.  関数とは？
  数学でよく見る、y=f(x)です。プログラミングの世界でも、この数学の考え方と一緒です。
  言葉で書くと、「fにxを入れると、yを返してくれる」ということ


  2. 関数の書き方
  function func_name(*args){ return xxx;}って感じです、

  *args=引数: y=f(x)の「x」, any個、いくつもの引数を取ることができます
  return xxx; =返り値のこと: y=f(x)の「y」, 大抵の言語では、返り値（return値）を設定します。これ設定しないと何も帰ってきません。

  ex)
  function add(a, b) {
    return a + b;
  }
  function calcInvoices(a, b, c) {
    return a + b + c;
  }
  function battle() {
    console.log("いざバトル！")
  }
  function outputResultText() {
    return ["text1", "text2"];
  }

  だめ、何も返らない
  function add(a, b) {
    a + b
  }


  3. 命名規則の基本
  Javascriptでは、ロワーキャメル記法で記述するのが一般的です。

  ex)
  function add() {}
  function battleJanken() {}
  function outputResultText() {}


  4. 関数名の決め方のコツ
  こちらはどの言語でも共通だと思いますが、「動詞 + 名詞」で命名するのが良さげです。
  ちなみに変数名は、「名詞」で命名するのが多いです。

  ex)
  preferred: function resultOutput() {}, non-preferred: function outputResult() {}
  preferred: function invoiceCalculation() {}, non-preferred: function calcInvoice() {}

  5. 関数の原則
  関数は、その関数一つに対して、一つの責務を担うことが好まれます。
  ・足し算する関数
  ・なにかアウトプットする関数
  ・じゃんけんを判定する関数

  「足し算して、その結果をアウトプットする」のような関数はあまり好まれません（責務が2つある。①足し算する②結果をアウトプットする）。

  僕が思うにプログラミング（プロダクト開発）は、
  ・メンテナンス性
  ・疎結合（関数の独立性）
  ・可読性
  などが大事なので、関数一つでひと責務となっているのかなあと
 */

/*
  script_explain.js が読み込まれているか確認するための、確認console.log
 */
console.log("start load script_explain.js");

/*
  グローバル変数で結果を定義する
  JSONオブジェクトで定義する

  もっと知りたい人は、「スコープ」「グローバル変数」「ローカル変数」で検索！
  検索するときのコツは、「javascript スコープ」「javascript グローバル変数」のように、
  「言語 + キーワード」とすると良いかも。言語指定しないと違う言語が出てくる可能性があります。

  またフレームワークなど使っている場合は、「laravel 変数」「react 変数」などして、
  検索することが多いです。
 */

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

/*
  以下でも全然オッケー
  const win = "WIN";
  const lose = "LOSE";
  const draw = "DRAW";
  呼び出し方は、win lose draw などでオッケー
*/

/*
  ロジックは、以下を参考にじゃんけんのロジックを作成する
  https://staku.designbits.jp/check-janken/
  https://qiita.com/mpyw/items/3ffaac0f1b4a7713c869
*/

/*
  実質的にここがじゃんけんのロジックを司る
  こちらをメインにコードを構築しても可能
 */
function battle(myHand, cpuHand) {
  /*
    return type: integer, value: -1 0 or 1 or 2
    2: win, 1: lose, 0: draw, -1: undefined
   */
  /* For debug */
  console.log("myHand: ", myHand);
  console.log("cpuHand: ", cpuHand);

  return (myHand - cpuHand + 3) % 3;
}

/*
  battle関数を使って、じゃんけん判定を行う
 */
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

/*
  結果に応じた処理をする、今回はconsole.logのみだが、こちらでDOMを書き換える（更新する）処理を書く
 */
function outputResultText(_result) {
  if(_result === result.win) {
    console.log(message.win);
  } else if(_result === result.lose) {
    console.log(message.lose);
  } else if(_result === result.draw) {
    console.log(message.draw);
  } else {
    console.log(message.error);
  }
}

function outputResultText2(_result) {
  if(_result === result.win) {
    return [message.win, true];
  } else if(_result === result.lose) {
    return [message.lose, true];
  } else if(_result === result.draw) {
    return [message.draw, false];
  } else {
    return [message.error, false];
  }
}

/*
   クリックイベントハンドラを定義する
 */
$(".btn").on("click", function() {
  let cpuHand = Math.ceil(Math.random()*3);
  let myHand = $(this).val();
  outputResultText(judgeJankenLogic(myHand, cpuHand));
});

/*
  負けと失敗したときだけアラートに出したい！などの場合は、以下のように実装すると良さそう。
  ただしいくつかの方法あるので、色々試して見てください
 */
// $(".btn").on("click", function() {
//   let cpuHand = Math.ceil(Math.random()*3);
//   let myHand = $(this).val();
//   let [message, continue_flag] = outputResultText2(judgeJankenLogic(myHand, cpuHand));
//   if(continue_flag) {
//     console.log(message);
//   } else {
//     alert(message);
//   }
// });

/*
  script_explain.js が読み込まれているか確認するための、確認console.log
 */
console.log("end load script_explain.js");