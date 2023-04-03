const Joi = require('joi');

const express = require('express');
const { responsivePropType } = require('@mui/system');
const app = express();

app.use(express.json());

// api call given the string
// string(spaces) to string(no spaces)

//part 1
// make a n*n array with n of the spaces 
// shift all n-1 by 1
// count coincidences 
// determine key length

// part 2
// count occurances of the letters
// n * n array with the freqnecies 
// determine the first letter
// do this (key length) times


// all the data go there
const paragraphs = [
  {id: 1, letters: [1,2,3]},
]

const decoded = [
  {id: 1, letters: [2,3,1]},
]
 
const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
]

app.get('/api.paragraph', (req, res) => {
  
  res.send(paragraphs[req.body.id + 1]);
});

app.get('/', (req, res) => {

  res.send('jis');
});

app.post('/api.paragraph', (req, res,) => {
  // const schema = {
  //   name: Joi.string().min(3).required()
  // };

  // const result = Joi.validate(req.body, schema); 
  // if (result.error){
  //   // 400 Bad
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }
  const paragraph = {
    id: paragraphs.length + 1,
    letters: req.body.letters
  }
  paragraphs.push(paragraph);
  res.send(paragraph);
})

app.put('/api/courses/:id', (req, res) => {
  var course = courses.find(c => c.id === parseInt(req.params.id ));
  if (!course ) res.status(404).send('The course with the given ID was not found')
  res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
  var course = courses.find(c => c.id === parseInt(req.params.id ));
  if (!course ) return res.status(404).send('The course with the given ID was not found')
  res.send(course);
})

// PORT 
const port = process.env.PORT  || 3000;
app.listen(3000, () => console.log(`listening on port ${port}...`));

app.delete('/api/courses/:id', (req, res) => {
  // look up course

  //delete
const index = courses.indexOf(courses);
courses.splice(index, 1);
res.send(course)
})

function tracksUppers(text){
  let result = [];
  let result2 = [];
  for (let i= 0; i < text.length; i++){
    if (text.charCodeAt(i) < 97 || text.charCodeAt(i) > 122){
      result.push(text[i]);
      result2.push(i);
      // console.log("result",  text[i])
      // console.log("result2",  i)
    }
  }
  return {result, result2};
}

function addUppers(text, blankArray){
  for (let i= 0; i < blankArray.result.length; i++){
    // console.log("char", blankArray.result[i])
    text = text.slice(0, blankArray.result2[i-1]) + blankArray.result[i] + text.slice(blankArray.result2[i]);
    // console.log("added")
  }
  return text;
}

function tracks0s(text){
  let result = [];
  for (let i= 0; i < text.length; i++){
    if (text[i] == " "){
      result.push(i);
    }
  } 
  return result;
}

function add0s(text, blankArray){
  for (let i= 0; i < blankArray.length; i++){
    text = text.slice(0, blankArray[i]) + " " + text.slice(blankArray[i]);
  }
  return text
}

function remove0s(paragraph){
  let removed = []
  for (let i= 0; i < paragraph.length; i++){
    if (paragraph[i] != 0){
      removed.push(paragraph[i])
    }
  }
  // let newRemoved = [];
  // for (let i = 0; i < removed.length; i++){
  //   let newLine = [];
    
  //   for (let j = 0; j < removed.length; j++){
  //       newLine.push(removed[j])
  //   }
  //   newRemoved.push(newLine);
  // }

  

  return removed
}

// function shift(paragraphSquare){
//   let shifted = [];
//   for (let i = 0; i < paragraphSquare.length; i++){
//     let newLine = [];
    
//     for (let j = 0; j < paragraphSquare[i].length; j++){
//         newLine.push(0)
//     }
//     shifted.push(newLine);

//   }
//   let shiftNum = 0
//   for (let i = 0; i < paragraphSquare.length; i++){
//     let thisShift = shiftNum;
//     for (let j = 0; j < paragraphSquare[i].length - shiftNum; j++){
//       shifted[i][thisShift] = paragraphSquare[i][j];
//       thisShift += 1;
//     }
//     shiftNum += 1
//   }
//   return shifted;
// }

function monoFrequency(text){
  let monoFrequencies = new Array(26).fill(0)
  for(let i = 0; i < text.length ; i++){
    monoFrequencies[text[i] - 1] += 1;
  }
  for(let i = 0; i < 26; i++){
    monoFrequencies[i] = monoFrequencies[i]/ text.length;
  }

  return monoFrequencies
}

function monoFitness(text){
  result = 0
  for(let i = 0; i < text.length ; i++){
    result += monoFrequency(text)[text[i] -1] * englishLetterOccurence[text[i] -1];

  }
 
  return result / text.length;
}

function tetrafrequency(paragraph){
  let tetrafrequencies = new Array(26 * 26 * 26 * 26).fill(0);
  for(let i = 0; i < paragraph.length; i++){
    tetrafrequencies[(paragraph[i] - 1)* 26 *26 * 26 + 
                    (paragraph[i+ 1] -1)* 26 * 26 +
                    (paragraph[i+2] -1 ) *26 +
                    (paragraph[i+3] -1)] += 1;
                    
  for(let i = 0; i < 26 * 26 *26 * 26; i++){
    tetrafrequencies[i] = tetrafrequencies[i] / (paragraph.length - 3);                
  }
  }
return tetrafrequencies;
}

function fitness(paragraph){
  result = 0
  for(let i = 0; i < paragraph.length - 3; i++){
    let frequency = tetrafrequency(paragraph);
    let index = (paragraph[i] - 1) * 26 *26  + 
    (paragraph[i+1] -1) * 26 * 26 +
    (paragraph[i+2] -1) * 26 +
    (paragraph[i+3] -1)
    // console.log("letters", paragraph[i], paragraph[i + 1]);
    let fitness = frequency[index];
    // console.log("fit", fitness);
    if(fitness == 0){
      result -= 0;
    }
    else{
      result += Math.log(fitness);
      // console.log("fit", fitness);
    }
    return result;
  }  
}

function indexOfCocincidence(text, length){
  // if (length < 10){
  //   console.log(text);
  // }
  let counts = new Array(26).fill(0);
  for(let i = 0; i < length; i++){
    counts[text[i]] += 1
  }

  let numer = 0
  let total = 0
  for(let i = 0; i < 26; i++ ){ 
    numer += counts[i] * (counts[i] - 1);
    total += counts[i];
  }
  return 26 * numer / (total * (total - 1));
}

function period(text){
  let found = false; 
  let period = 0
  while(!found){
    period = period + 1;
    let slices = new Array(period).fill(new Array(Math.ceil(text.length / period)).fill(0));
    for(let i = 0; i < text.length; i++ ){ 
      slices[i % period][Math.floor(i / period)]= text[i];
      if(period < 10){
        // console.log("slices, period", slices, period, i % period)
      }
      // console.log("i, period, text[i], i%period", i, period, text[i],i%period);
    }
    
    let sum = 0;
    for(let i = 0; i < period; i++ ){ 
      sum += indexOfCocincidence(slices[i], slices[i].length);
    }
   
    let loc = sum / period
    if(loc > 1.6){
      found = true
      console.log("period loc", loc)
    }
    // console.log("period loc", loc, period)
  }
  return period;
}

// function frequency(paragraphS){
//   let frequency = [];
//   for (let j = 0; j < paragraphS[0].length; j++){
//     frequency.push(0);
//   }
//   for (let i = 1; i < paragraphS.length; i++){

//     for (let j = 0; j < paragraphS[i].length; j++){
//         if(paragraphS[i][j] == paragraphS[0][j]){
//           frequency[j] += 1;      
//         }
//     }  
//   } 
//   return frequency; 
// }

// function keyLength(frequency){
//   let biggest = 0 ;
//   let length = 3;
  
//   let current = 0
//   for (let i = 0; i < 3; i++){
//     for (let j = 0; j < 10; j++){
//       for (let k = j; k < frequency.length; k = k + i + 3){
//         console.log(frequency[k]);
//         current += frequency[k];
//       }
      
//       if (current * (i + 3)> biggest){
//         length = i + 3
//         biggest = current * (i+3)
       
//       }
//       current = 0 
//     }
//   }
//   return length;
// }

function getkey(paragraph, length){
  let shifts = []
  for(let i = 0; i < length; i++ ){
    let line = [];
    for (let j = 0; j < 26; j++){
      line.push(0);
    }  
    
    for(let j = i; j < paragraph.length; j += length ){
      line[paragraph[j]] += 1;
    }

    let shift = 0;
    let biggest = 0;
    let current = 0 ;
    for (let j = 0; j < 26; j++){
      for (let k = 0; k < 26; k++){
        current += line[j] * englishLetterOccurence[j];
      }
      if (current > biggest){
        biggest = current;
        shift = j;
      }
      let newline = [];
      for (let j = 0; j < 26; j++){
        newline.push(0);
      } 
      for (let j = 1; j < 26; j++){
        newline[j-1] = line[j];
      } 
      newline[26] = line[1];
      line = newline
  }
    shifts.push(shift)
  }   
  return shifts;
}

function letterToNum(words){
  let paragraph = []
  for(let i = 0; i < words.length; i++ ){
    if(words.charCodeAt(i) > 122 || words.charCodeAt(i) < 65){
      paragraph.push(0)
    }
    else{
      paragraph.push(words.toLowerCase().charCodeAt(i) - 96 )
    }
    
  }
  return paragraph;
}

function numToLetter(numbers){
  result = '';
  for (let i = 0; i < numbers.length; i++) {
    result += String.fromCharCode(numbers[i] + 96);
  }

  return result;
}

// function noKeyDecrypt(text, keyLength){
//   let key = new Array(keyLength).fill(1);
//   let result = new Array(1)
//   for (let i = 0; i < keyLength; i++) {
//    let result = new Array(26).fill(result);
//   }
//   for (let i = 0; i < keyLength; i++) {
//     for (let j = 0; j < 26; j++) {
//       if(result)
//     }
//    }
// }

function noKeyDecrypt(text){
  const originalText = text
  text = numToLetter(remove0s(letterToNum(text)));
  const keyLength = period((remove0s(letterToNum(text)) ));
  
  let fit = -99;
  let differentkey = new Array(keyLength).fill(1);

  let result = new Array(keyLength).fill(1);
   
  let current =  new Array(keyLength).fill(2);
  let key = new Array(keyLength).fill(1);
   for (let j = 0; j < keyLength; j++){
    let fit = 0
      let thisi = 0
      let letter = j
    for (let i = 0; i < 26; i++){
      // console.log("i", i)
      // console.log("new key 1", key)
      // console.log("new key 2", key)
      current[j] = i + 1;
      // console.log("new key 1", key);
      
      let newText = decrypt(text, numToLetter(current));
      // console.log("newtext," ,newText);
      // console.log("key," ,numToLetter(current));
      let newFit = monoFitness(remove0s(letterToNum(newText)));
        // console.log("newfit,", newFit, fit);
      // console.log("hello");
  
      if(newFit > fit){
        console.log("new Fit", newFit, thisi);
        thisi = i;
        fit = newFit
      }
      // console.log("hello");
    
    }
    console.log("thisi", thisi);
    key[j] = thisi + 1;
  }
  
  const str = decrypt(text, numToLetter(key));
  const with0s = add0s(str, tracks0s(originalText));
  const withUpper = addUppers(with0s, tracksUppers(originalText));
  // console.log(originalText);
  return withUpper;
}


function decrypt(text, key) {
  result = ''
  for (let i = 0; i < text.length; i++) {
    let p = letterToNum(text[i])
    let k = letterToNum(key[i % key.length])
    let c = (p - k + 27)% 26
    result += numToLetter(new Array(1).fill(c));
    // console.log(p, k, c); 
    
  }

  return result;
}
function isLetter(c) {
  return isUppercase(c) || isLowercase(c);
}

// Tests whether the given character code is an Latin uppercase letter.
function isUppercase(c) {
  return c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
}

// Tests whether the given character code is a Latin lowercase letter.
function isLowercase(c) {
  return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
}

const englishLetterOccurence = [8.2, 1.5, 2.8, 4.3,13, //abcde
                              2.2, 2, 6.1, 7, 0.15, //fghij
                              0.77, 4, 2.4, 6.7, 7.5, //klmno
                              1.9, 0.095,6,6.3, 9.1,//pqrst
                              2.8,0.98,2.4,0.15,2, 0.074]//uvwxyz]
console.log("remove 0s", remove0s([1,3,4,2,0,1])); 
const shiftExample = [[1,2,3,4,5], [1,2,3,5,5], [1,2,3,4,5], [1,2,3,4,5],[1,2,3,4,5]]
// console.log("shift", shift(shiftExample)); 
// const shifted  = shift(shiftExample);
// console.log("frequency", frequency(shifted));


// const keyLengthExample = [1, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0,1,0,0,0,0,1,0,0,0,0];
// console.log("keyLengtth", keyLength(keyLengthExample));
// const getKeyExample = [1, 2, 3, 4, 3, 23, 4, 10, 9,12, 3, 0,1,0,0,10,0,1,0,0,0,0];
// console.log("getKey", getkey(getKeyExample,3));

// console.log("lettertonum", letterToNum("abcdeFghi   jklmnopqrstuvwxyz"));

// console.log("numToLetter", numToLetter([1,2,3,4,5]));

const exampleTest1 = `so even though we face the difficulties of today and tomorrow, I still have a dream. It is a dream deeply rooted in the American dream.I have a dream that one day this nation will rise up and live out the true meaning of its creed:

We hold these truths to be self-evident, that all men are created equal.
 
I have a dream that one day on the red hills of Georgia, the sons of former slaves and the sons of former slave owners will be able to sit down together at the table of brotherhood.
 
I have a dream that one day even the state of Mississippi, a state sweltering with the heat of injustice, sweltering with the heat of oppression, will be transformed into an oasis of freedom and justice.
 
I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.
 
I have a dream today!
 
I have a dream that one day, down in Alabama, with its vicious racists, with its governor having his lips dripping with the words of interposition and nullification, one day right there in Alabama little black boys and black girls will be able to join hands with little white boys and white girls as sisters and brothers.
 
I have a dream today!`;

const exampleTest2 = `Fitness is a way to quantify how closely a piece of text resembles English text. One way to do this is to
compare the frequencies of tetragrams in the text with the frequency table that we built in the last
section. It turns out that throwing in a logarithm helps, too. The basic idea is to start with zero and add
the log of the value from our table for each tetragram that we find in the text that we are evaluating,
then divide by the number of tetragrams to get an average. The average is more useful than the total
because it allows our programs to make decisions independent of the length of the text. Defined in this
way, the fitness of English texts is typically around -9.6.`

const exampleMessage = `zo gfeu tjyunh yo fhcg dhl dkpfpcwvtpeu yf aofky hnf dototbod, I udisl jkvl a fbehm. Kd iz a fbehm foewla bovtgn iu tjo Atetschn fbehm.K race c nrlao dhht qxe kaa dhps pktpop gisl tssl ur knk lkfe vuv dhl ttee tecxiug qp ias ebeld:

Yo hvlf dhlsg drbtjc tv bg cesf-gfikepd, toav kls mgx aye ebehtgn exucv.
 
I oaxo a krgkm ahcd oue fky vn vre yef rislu yf Neqbgpa, vre zopc om fqbmlr uvaceu knk tjo svnu yf motwey snkvl oyxeys ysls bg kbse vy spt fywu tqqeahgb aa tjo thbno om btytoetrovd.
 
K race c nrlao dhht qxe kaa ovln vre ztcde vf Ossziuciwpk, k saavo sdendeyipq wptj dhl hgkt vf kxjbsvscl, syolaetsnn wkdh ahg reht qp owptosziqx, wpln le arcxsmotwek ipdo hn qksps qp fyegnot apn jbsvscl.
 
I jkvl a fbehm vraa ma pobr nstalg mhplfbeu wkvl vng naf lkfe pn c xaaiqx woeto toea gisl pyt ie lednef ly ahg mosot yf ahgsr zkkx bbt di toe eynaepd om tjoiy cjkrhcvor.
 
P hcfe h dtoat tqnaf!I jkvl a fbehm vraa opo dhy, fywu ip Klhbcwa, divr ias xscpowc rhckctz, wkdh ptu qocetxoy hcfiug jss sirc dyirziug ysto tjo wvrfc om ipdeypqciaiqx aud pelsihschtkyn, vng naf rkqha tjorl ip Klhbcwa sivdll bnkcr bqis hnf llhcm qiylu gisl do ailg do qokx hhnfc wptj viatno woivo bvyu knk wjstl gkblz au ciztgbs hnf lrvtjorz.I jkvl a fbehm vydhy!`;

const exampleMessage2 = `zo gfeu tjyunh yo fhcg dhl dkpfpcwvtpeu yf aofky hnf dototbod, I udisl jkvl a fbehm. Kd iz a fbehm foewla bovtgn iu tjo Atetschn`

const exampleMessage3 = `Ybvv ksmwmr vbyvnyf wpi uqufv-jekjx cuwkjfg qhamys uag blw iyflor gk uovbvshnvrvw lmug vcthtlg wpi vjmvjv sx wyhvifdj mbibaswy nql paglnuqik. Nn prdijx nuh xvaswvstik tz beriuy ielmrljx cuwkjfg qhamys, nuh jeknw extik tz cuwkjfg ryipmfnvrv, efi ykdumfjm gkm vwquglwrkmcc emxojya dtkgwcgkuw ssx qdbe kylhfbyjjm, nv eidq uf eiwah nrfpravorv nsj fhnogdasa noosjnnup kseufraqxq.

Ybr fwyjxy vv ayayuoom jgw vbwp GK ruwrzw ssx arv-qsoiev. Qx sxmhpmw lmug vbyvjhg kiw tjya lvxjtxhfmh lt nuh jeknw cuqrunjyha sx ulbjzee iyflor ssx prutmyuglwr.`

const exampleMessage4 = `Gvv vvyrkx ejfhavl wvoxbgzraqp ppxh lai jlfhvfhxiu wijvtb fy wvoykedf nbu lvqe etxyrzokbjel etxlevhp. Ba heetruf piibvwilr eeq fscy-kvinxr vkczfkhxigg eeq eshnpvek t wvevcll jsmebxdrah kh wvaummtny vrgkw-of ivfteodfprg.

Uhyifr csclgtaoij

Gus xhhp ik ms yryd phb ynvxvjgnbu moi pjbrtvczvl vj cdtwj-ongvw wvoyked qrgzzu ysagk ra bpaxjx-ojbiegrr gkvkrsfqzat zrgnyayx(w), ebg xlla Nant. Nrin wj nzid kh av pnb cxhvn zha kur dibugiheij nes lllh if ivrpgwtts ephemtngwfgz, env zmmrf ij tu sphhvkhawkr as dalglff hyx zxrwgkkuf oew diacgijfrg fy senynexrf oew werswmxzf.`

let numMessage = remove0s(letterToNum(exampleMessage2));
let numMessage2 = remove0s(letterToNum(exampleMessage));
let numMessage3 = remove0s(letterToNum(exampleMessage3));
let numMessage4 = remove0s(letterToNum(exampleMessage4));
let numMessage5 = remove0s(letterToNum(exampleTest1));
let numMessage6 = remove0s(letterToNum(exampleTest2));
// console.log("remove 0s", numMessage); 
// console.log("length", numMessage.length)
// console.log("shift", shift(remove0s(letterToNum(exampleMessage2)))); 

// const shifted2 = shift(remove0s(letterToNum(exampleMessage2)));
// console.log("frequency", frequency(shift(remove0s(letterToNum(exampleMessage))))); 
// console.log("ioc", indexOfCocincidence(numMessage, numMessage.length));
// let ioc = indexOfCocincidence(numMessage, numMessage.length);
// console.log("freq", monoFrequency(numMessage));
// console.log("fitness6", monoFitness(numMessage6));
// console.log("keyLengtth", period(numMessage));
// console.log("keyLengtth2", period(numMessage2));
// console.log("keyLengtth3", period(numMessage3));
// console.log("keyLengtth4", period(numMessage4));
// console.log("decrypt", decrypt(numToLetter(remove0s(letterToNum(exampleMessage4))), "northeastern"));

let mess = `Knowledge nay estimable questions repulsive daughters boy. Solicitude gay way unaffected expression for. His mistress ladyship required off horrible disposed rejoiced. Unpleasing pianoforte unreserved as oh he unpleasant no inquietude insipidity. Advantages can discretion possession add favourable cultivated admiration far. Why rather assure how esteem end hunted nearer and before. By an truth after heard going early given he. Charmed to it excited females whether at examine. Him abilities suffering may are yet dependent.

Finished her are its honoured drawings nor. Pretty see mutual thrown all not edward ten. Particular an boisterous up he reasonably frequently. Several any had enjoyed shewing studied two. Up intention remainder sportsmen behaviour ye happiness. Few again any alone style added abode ask. Nay projecting unpleasing boisterous eat discovered solicitude. Own six moments produce elderly pasture far arrival. Hold our year they ten upon. Gentleman contained so intention sweetness in on resolving.

Fat son how smiling mrs natural expense anxious friends. Boy scale enjoy ask abode fanny being son. As material in learning subjects so improved feelings. Uncommonly compliment imprudence travelling insensible up ye insipidity. To up painted delight winding as brandon. Gay regret eat looked warmth easily far should now. Prospect at me wandered on extended wondered thoughts appetite to. Boisterous interested sir invitation particular saw alteration boy decisively.

Throwing consider dwelling bachelor joy her proposal laughter. Raptures returned disposed one entirely her men ham. By to admire vanity county an mutual as roused. Of an thrown am warmly merely result depart supply. Required honoured trifling eat pleasure man relation. Assurance yet bed was improving furniture man. Distrusts delighted she listening mrs extensive admitting far.`
console.log("no key decrypt", noKeyDecrypt(numToLetter(remove0s(letterToNum(mess))),period(numMessage2) ))

let test = ``

let testM = `N oz t lwtaqm zhxwitysq brrvonrhtp dhkxivgk o phrpvgir ztoce br qbfuigxv gpbjbpx ebq mmsnmvs, jbyv n nrwdnj pyxrr by ysparwptq oaw gfrtywix wyveqg gaeh ztps zx e jnezooei ofljh vg ebl mjoz hv dehospm. Awga f gbemr shzbqtxwbg nb phqdhmjf cksuetravgk oaw bso wijretdzxrh, phzdyxh kvmm o qxid niufrvmogbtb shv hux ffgl, M pebsu n pizy-ktiawir cxwgcxghvoj hb xzseryvvgk W qh. Hiekibged, W nf kovgnbt ivopmnqne ilcxwwrggs nl f Kru Hsixqccxv og AfqxUioaith ngh o Fhkhjtvs Qxasyhtse Vt-cc tx Kbhi Anvosasns, phpznutfnmmbt pnhu wmjrkxs ckstrlxwbgezf mt gutvdrg rm gxgvabhoy lowyex oaw jcfmjf vgrcitywbg.
Mb zr xdnki hvfj, W vghiyzj wa t voazj cs vvsnmnjr aspobjg gaeh neqcj fi hb xcdexwg zr ffgbwhvv xwqx. M oz ifgfbsbnmj oohyh gawwsmmbt, tqknrw ca mms yhsybny tbk ybvjzs ngh jvgyotx xfrtxiexw huty W ptr frlycex sf exuieisgr. Tirvmmcatqzl, B sdrkfhr t wipvjgfyyz cathbzvocad phlmbrlx qnepsq “Imcghkfnimm Jbxv Zbps,” ptthhknbt oefvhzg roibgl fbq ivcqnhwaz whhgswaz tcemwovmw tbk hzvxrhf. B fzfh ibwhd skiifvfjbgbru jbyv qbjtrkjbg wigvzs hbhpg ngi gbyxknkj, qexehvgl uettvvvx, kruwwgxx, oaw pcthx hutx pebsu vwiof mt zvyi.
Thkyvrkqcex, N oz asbbkjr gh wseoj of t Vsfbisam Egfbxhngx (FN) ytf Ahvhuxfggxvb Hgnjrkwwgr’x qbftigxw gpbibpx icef, avrkj W cksjvwj argxcelmwc trr fnudbkx hb t iwixvgr zwchi st fmzrrgxg, pkjogbru ng nbpeygvoj oaw asyvtavgk qbfriabxm shw oye. Eg ng WO, V aejr wjjresdrw nbitpinuqs yxerrkxvvi, gcayqwpm vsfhqigbsb, ngi qbfqiabym-onmzqbsu fdmzyl yvnm loix ufriefrw rs shv oar hvnepsazj.
Zbhowaz kcepefq, B fa rtkse mt grvyfr t Xizfif 2024 vgysegwvvi yvnm awye jbnups zx yc phrhvgzs qxzsyhuwaz qm fdnzyl ebq vtbgkmphmnbt ms wzifqgyyz cktxrvxg. Vy dch tvs fxjyvgk o qrsozbg hrtr arffse pnhu t toflnca ysf gxhvahpctr fbq mls nkyg, V psiyw gs gavwyejr gh gcagjqg trr rquzbki dbmjbgbez biucemybvmnsf.`

let testM2 = `Chds BcmiHvaikt htfogtv eicjagbh twd yeutpxil venssiva jlrnb tzg Mqvxwèrz carymg. Mqe feq olai ajvz al nvihm xnz lwvkmg. Mqe feq kj kpln-iiswpjqibee vnv pfv-axctzrk cim xzwomev. Yymc xwcmyhvzvv ha dzcjagbxgp, tce ucjm xl yrzswtmms, twd iof-nvbixas vrw wekwtwgzd. Ljv Kpxbam carymg bb a npwezia vjsz ox vym Kbpeièrw ezxwxa wdtz c fvt-entoej mvg.`
let testM3 = `Qaxk ljv tttpuz efxzaxhws ohw gdxdpnrdny efuqbwaoigp fn ixlhiodqxg pgm okpgtkccbcizs lq xmcxaaoe htrkiblag sgnlbxhws aoj tvia-pxrgd htfjaxvs vnv riwsnle vn wxvz-xglrzakkeo xfyaxt.

Okkp ian iiilkrtxsjtdof qw qil oimsl guqibxn, caum kpt enabuw czuh mx eiatnv ainmeitk vf xjm cobeljvz ianim pgvvvibjl vbanzbxxb ii ivgrbxhw, dzsaie, icw meqedqgutgc tj bmkcl ekxjzclu npxvq wdld eimpmn ai ierrkiydl zcgupaixv oa ifpfdpmxrn aff tzttcoms. Ljv xgbxr aouwj txxb ii bjkeoxgp tjgwvymg lcuyefvj, btvqnjlgip, icw rnionckqdg co yengcwe tw ihpsek-lgbeei cgodccbcy oo setwbiuinh yqrth

Mqe ohwova uha Hvcc vym Axjgpe stv

- Mcorrjnegeb pgm Cgieckm rajnbe

Unzupmn ccafiv qh tw oiggkeo ekxbgee yzbw hdr klspvb, hh fe rafv kw tgloprsiv ppvtems lq scxem sjlmvzwcl co oaumcm iars dskwv icw lohe mr nqia bohe apewktciqe kqccibxnn.

- Wwd3 & StdvtCcaap(Jxdmuibhl Viird)

Meqedqg adedtdofu kw wxup juj ufkxxcy rilj pwjk Rmkauvwca Pnb3 & Wlgebkwtrn Oeujewahpy-wakgu xghsextk.

- Fvdtexpzr Lqfth & Iaoyuuvzdxmh

Bpidf r ppvt tcal jvtel Meqedqgmgl rn ohwki lpr-co-yaq riwvkjmhifi-mmgln wdtz xrzxhds yengcwexa tjodkeo eejtaojoj wg mnccngnfon twd xoeolvxvjtz tzg zuehatvnug fn btwabifi ympecht Pjqucrmrvdtq.

- Qgmc Bwnjvsvzwc 

Pn djn'l yrvi hdr caumvzh mx ldmav kptba iyesu, jw lx jlno zcmm pg Xpzn Apewktcijn ltrkz pqeme zctstkb cvn uqdm ji fioh ljvqg hfn ddwcj, icw vafe syvadfn iingxrbxon pmobgtbh barzshgtbxon oa afa kptfn.`
testM4 = `Zask dsv otlyuu exgzvxzfs jho pdsdhwrynq nfpqtfajiyy fi ipuhdovzxb pyv ofpyckxctlius dz xhcpjaje zcrfituab sywlwxzfs vob cvda-hgrbd zcfeapes qnn airsfue qn ogvu-xyuruactej xxhast.

Gtkk isw ididtroxkstyox zw lid xihsd pulitgn, xamv kkt wwawuo lzph eg edalwv vifvedtc ef sje lowedsvu iswih pyevqitsl qbswzwxpk id inprwxzf, dussre, dco velevzgptyl te betcg ecgjucdd nkxnz wylv nihpew ad iwarfiqml ucydpvipe ov ixyfypegri axo tutllohs. Dsv sgtgr vomfj oxpk id bbtejxyy tegoeyhg dlutexej, wtnznelyrp, dco andoflkldy lo tefpcre lf icpknk-ggtned cyxdxctly jo kntrbadiih qzroh

Eze jhoxvv uzj Hqcu eyh Apsgke kcv

- Hcgarenwpew pyv Cbiwlkh rssnwe

Mwzppew cxaxrv lh lf odgytej ecgbbew hzww zmr flkyvw, hz oe maxe kr tyuokrkrv kpncehs dz sxxwv seleezrcd lo jamvch isas yscfv dco uoce ea nlis koce syerkllile czcxitgni.

- Wom3 & SodncCxasy(Jsdediwhd Eidrv)

Velevzg vdwmtyoxd kr wpdp eub dffxply mids prjc Amfamewxa Hwb3 & Rlynbfwlan Jemserazyy-racpu sgzbestc.

- Ovytwgpur Dzfoh & Ajotumezyxeq

Bkivo r kpnc txad svoed Velevzghgd an jhoti gpj-lo-tai airvcsmcixr-mhgdw wytr gruxzms tefpcrepj teovtej ewstvobxj rg ewcxnywfjn lfd sowxlqxnstu trp zpezjtqnmp fi blfawixr yhpwlho Pbzuxreavyti.

- Zghc Tfnevkezrc 

Hw den'd hrqi zmr xamvvuh eg lymse kkttj itekd, jr lp slio rlmh py Gpun Syerkllien dcrfz hzehe rltntck cqn mzdh ja oijh dsvlg zon ydolj, dco eaae khvvdxw idnygrwxgw photptwh tjruszptwxgw ov axj kktxw.`




