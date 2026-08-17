/* ============================================================
   EVENT HORIZON — Day 1 Prototype
   ============================================================ */

/* ---- SCRIPT DATA ----------------------------------------- */

const INTRO_CARDS = [
  "The universe has gotten a lot busier these days. It barely takes any time to get anywhere, as long as you've got the equipment for it.",
  "Unfortunately for you, Ester, you're stuck where you are.",
  "While fifty years ago, people would have fought tooth and nail to be in your research organization, it’s been exiled to an abandoned space station locked in orbit around a black hole.",
  "This is no situation any reasonable scientist wants to operate in. You don’t really have a choice, though. Your old university decided you were \"uncooperative and a hazard to the scientific community.\”",
  "It seems your only hope is to get this failing research station back to its glory days by fixing the transport ship.",
  "To do so, you must work efficiently, while maintaining courteous relationships with your supervisor,  Sam, and coworker, Jerry."
];

/* Node types: "dialogue", "inner", "narration", "choice", "control" */
const SCENE_SCRIPT = [
  {id:"s1", type:"dialogue", speaker:"SAM", text:"I’m Sam.", next:"s1_inner1", showSprites:["sam","ester"]},
  {id:"s1_inner1", type:"inner", text:"In the corner of my eye, I see a safety hazard: the terminal system.", next:"s1b"},
  {id:"s1b", type:"dialogue", speaker:"SAM", text:"I’m your supervisor because technically, I’m your senior here. But don’t come to me with complaints later, because I can’t help with the higher-ups.", next:"s1_inner2"},
  {id:"s1_inner2", type:"inner", text:"The way it’s set up is a safety hazard.", next:"s1c"},
  {id:"s1c", type:"dialogue", speaker:"SAM", text:"Oh yeah. You and Jerry are technically “visiting students,” even though you’re still going to be working. Questions?", next:"s1_choice"},

  {id:"s1_choice", type:"choice", choices:[
    {label:"Prioritize the crew’s safety and ask about the terminal system.", next:"s2"},
    {label:"Ignore what might be a disaster.", next:"crash_cut"}
  ]},

  {id:"s2", type:"dialogue", speaker:"ESTER", text:"Yes. I’m concerned about how the terminal system is bolted in close proximity to the atmospheric monitoring devices. The venting should cause some issues, right? Do you have a fume hood anywhere?", next:"s3"},
  {id:"s3", type:"dialogue", speaker:"SAM", text:"…Yes?", next:"s4"},
  {id:"s4", type:"dialogue", speaker:"ESTER", text:"And there shouldn’t be a device containing high mercury haphazardly arranged in this room.", next:"s5"},
  {id:"s5", type:"dialogue", speaker:"SAM", text:"It’s been there for eight months.", next:"s6"},
  {id:"s6", type:"dialogue", speaker:"ESTER", text:"But that doesn’t decrease the health risk. It just means you’ve been in close range to danger for longer!", next:"crash_cut"},

  // crash_cut is a control node — Jerry walks into frame as pb1 plays, no camera cut
  {id:"crash_cut", type:"control", action:"jerry_enter", next:"pb1"},

  {id:"pb1", type:"dialogue", speaker:"SAM", text:"It’s fine, Ester. Oh, Jerry’s here. Hey, Jerry, can you grab the—JERRY!", next:"pb2", showSprites:["sam","jerry","ester"]},
  {id:"pb2", type:"inner", text:"I’ve heard accidents like that before when I was still in my old lab. No matter how many times it happens, I flinch like a rabbit being chased.", next:"pb3"},
  {id:"pb3", type:"dialogue", speaker:"JERRY", text:"I’m sorry — it wasn’t— I turned around and my sleeve caught it, it was right on the edge, I didn’t—", next:"pb4"},
  {id:"pb4", type:"dialogue", speaker:"SAM", text:"Oh, God.", next:"pa1"},

  // Post-crash
  {id:"pa1", type:"inner", text:"It’s just like the samples I used to see in the chemistry lab at school. The only metal to be liquid under room temperature, highly toxic, boiling point at 357°C. And it’s currently making a mess—a highly toxic mess—on the lab floor.", next:"pa2"},
  {id:"pa2", type:"dialogue", speaker:"ESTER", text:"Everyone, stop walking. Jerry — vacuum and a disposable sharps bin, the largest rigid one in the cabinet, not the bag. Could you seal the door, Sam? I'll fix the mercury leak.", next:"pa2_minigame"},

  // pa2_minigame is a control node — the sensory-overload minigame plays, then dialogue resumes at pa2b
  {id:"pa2_minigame", type:"control", action:"sensory_minigame", next:"pa2b"},

  {id:"pa2b", type:"dialogue", speaker:"ESTER", text:"I’ll write the incident report. Jerry, what’s your surname? I’m putting your name down as the person responsible. I don’t want us to be in a lab-turned-hazard chamber. And — this was an accident, correct?", next:"pa3"},
  {id:"pa3", type:"dialogue", speaker:"JERRY", text:"Of course it was an accident. That’s what I just said.", next:"pa4"},
  {id:"pa4", type:"inner", text:"Nobody has moved. Sam is looking at the floor.", next:"choice1_inner"},

  // Inner voice before choice
  {id:"choice1_inner", type:"inner", text:"You asked a yes-or-no question. He said yes. But he froze, and his voice went tight. People don’t react like that to answering a question correctly.", next:"choice1"},

  {id:"choice1", type:"choice", choices:[
    {label:"“What’s wrong?”", next:"ba1"},
    {label:"“There’s six ounces of mercury, and the vent is running. We need this contained as soon as possible!”", next:"bb1"}
  ]},

  // Branch A — "What's wrong?"
  {id:"ba1", type:"dialogue", speaker:"JERRY", text:"Are you serious? I barely even know who you are! All you want to do is accuse me! And you’re trying to get me in trouble by writing me up in the incident report!", next:"ba2"},
  {id:"ba2", type:"dialogue", speaker:"ESTER", text:"I don’t know you very well either. I’m not trying to get you in trouble.", next:"ba3"},
  {id:"ba3", type:"dialogue", speaker:"JERRY", text:"Then why are you singling me out??", next:"ba4"},
  {id:"ba4", type:"dialogue", speaker:"ESTER", text:"Your sleeve got caught on the device. That’s the truth. The incident form has a field labelled “person responsible” and it doesn’t have a field for anything else.", next:"ba5"},
  {id:"ba5", type:"dialogue", speaker:"JERRY", text:"We could have sorted out whose name goes where later. It’s the way you said it. “What’s your surname, I’m putting you down as responsible.” You’ve barely even been here for a week. It’s like you were reading out a prison sentence! God!", next:"ba6"},
  {id:"ba6", type:"inner", text:"Oh. He was angry about the form. I stare down at the liquid from the machine, pooling on the floor, then back at him. Jerry was as clearly frustrated as he could have possibly been; he was fidgeting uncomfortably.", next:"ba7"},
  {id:"ba7", type:"dialogue", speaker:"ESTER", text:"I wasn’t trying to sentence you. I say things in the order I think of them, and when I saw the mercury, that was the only thing I could think about.", next:"ba8"},
  {id:"ba8", type:"dialogue", speaker:"JERRY", text:"I guess that makes sense. I shouldn’t have lost my temper. Sorry.", next:"ba9"},
  {id:"ba9", type:"dialogue", speaker:"ESTER", text:"I’m sorry, too. But—again about the mercury, can we all get this cleaned up together? Quickly!", next:"ba10"},
  {id:"ba10", type:"dialogue", speaker:"JERRY", text:"OK, OK. Sam! Done with the door? Come here!", next:"ba11"},
  {id:"ba11", type:"inner", text:"In the end, it still took too long to clean up the mercury. I completed the report, in the end, only with a dash in the place where “Person Responsible” was supposed to be. The room had to be sealed off though. Objectively a disaster for our resources, but Jerry dodged the consequences…", next:"ba11_recap"},
  {id:"ba11_recap", type:"recap", text:"The accident has created a major inconvenience for the crew, but at least you’ve repaired your relationship with Jerry.", next:"sc2_open_inner"},

  // Branch B — "There's six ounces of mercury..."
  {id:"bb1", type:"dialogue", speaker:"JERRY", text:"Right. Yes. Sorry, sorry. . .", next:"bb2"},
  {id:"bb2", type:"inner", text:"He went for the bin, as fast as possible, and I still couldn’t tell what that expression on his face was supposed to mean. Did I make the correct decision? “I’m putting your name down as the person responsible.” Was that too harsh? I could never tell. This sort of mistake — the one only I couldn’t see — was happening again.", next:"bb3"},
  {id:"bb3", type:"dialogue", speaker:"SAM", text:"I, uh— nice work, Ester. Quick thinking. Yeah…", next:"bb4"},
  {id:"bb4", type:"inner", text:"The words make sense, but what Sam means doesn't. Sam is making the same face as Jerry. Ignoring what they might think of me, I still go ahead and fill in the form.", next:"bb4_recap"},
  {id:"bb4_recap", type:"recap", text:"You successfully resolved the toxic spill in the lab. However, a sense of awkwardness has emerged between you and Jerry…", next:"sc2_open_inner"},

  /* ============================================================
     SCENE 2 — Day 2: The Black Hole
     ============================================================ */

  {id:"sc2_open_inner", type:"inner", text:"It’s my second day as a rookie. As I’m measuring some mercury samples, something else catches my eye.", next:"sc2_1", showSprites:["sam","jerry","ester"]},
  {id:"sc2_1", type:"dialogue", speaker:"ESTER", text:"Sam, come over here right now. Why are we currently floating so close to a black hole?", next:"sc2_2"},
  {id:"sc2_2", type:"dialogue", speaker:"JERRY", text:"Yeah, Sam… Why didn’t you tell us right away that we were floating over a black hole?", next:"sc2_3"},
  {id:"sc2_3", type:"dialogue", speaker:"SAM", text:"This just gives this space station an identifiable location for people to be able to visit us.", next:"sc2_4"},
  {id:"sc2_4", type:"dialogue", speaker:"ESTER", text:"But won’t we eventually get sucked into the black hole? Why not just set up some kind of base on Mars?", next:"sc2_5"},
  {id:"sc2_5", type:"dialogue", speaker:"SAM", text:"We have a special engine below our feet that keeps us suspended above the black hole. Stop whining or I’ll push you into the black hole myself.", next:"sc2_choice1"},

  {id:"sc2_choice1", type:"choice", choices:[
    {label:"Prioritize the crew’s safety.", next:"sc2_insist1"},
    {label:"Ignore it — the dynamic is already awkward enough.", next:"sc2_woosh"}
  ]},

  {id:"sc2_insist1", type:"dialogue", speaker:"ESTER", text:"I’m serious! I don’t care if we have an engine that knocks elephants off their feet! We shouldn’t be over a black hole!", next:"sc2_insist2"},
  {id:"sc2_insist2", type:"dialogue", speaker:"SAM", text:"How did you even get into grad scho—", next:"sc2_woosh"},

  {id:"sc2_woosh", type:"narration", text:"Woosh! A sudden whoosh sounds out from underneath the spaceship.", next:"sc2_wait"},
  {id:"sc2_wait", type:"dialogue", speaker:"SAM", text:"Wait, what was that?", next:"sc2_6"},
  {id:"sc2_6", type:"dialogue", speaker:"ESTER", text:"This doesn’t sound good… I’ll check the cameras around the ship.", next:"sc2_inner2"},
  {id:"sc2_inner2", type:"inner", text:"Sam’s expression has not changed whatsoever… Doesn’t he even care about our safety? Whatever, I won’t die because of someone else’s lack of awareness.", next:"sc2_7"},
  {id:"sc2_7", type:"dialogue", speaker:"ESTER", text:"This is serious, an engine at the bottom of our ship is falling down! Is that the engine that’s supposed to keep us afloat?", next:"sc2_8"},
  {id:"sc2_8", type:"dialogue", speaker:"SAM", text:"Yeah, I’m leaving…", next:"sc2_sam_exit"},
  {id:"sc2_sam_exit", type:"narration", text:"Sam jumps into the only escape pod and leaves the space station.", next:"sc2_9", showSprites:["jerry","ester"]},
  {id:"sc2_9", type:"dialogue", speaker:"ESTER", text:"What are you doing?", next:"sc2_inner3"},
  {id:"sc2_inner3", type:"inner", text:"Why is he leaving us so abruptly? Anyways, we have no time — we’re on track to being swallowed by the black hole. Our only option is to construct a new engine from scratch…", next:"sc2_10"},
  {id:"sc2_10", type:"dialogue", speaker:"ESTER", text:"Jerry, come here!", next:"sc2_11"},
  {id:"sc2_11", type:"dialogue", speaker:"JERRY", text:"What’s going on?", next:"sc2_12"},
  {id:"sc2_12", type:"dialogue", speaker:"ESTER", text:"We are floating over a black hole right now, and an engine on our ship has just fallen off! As a result, we will eventually be sucked into the black hole.", next:"sc2_13"},
  {id:"sc2_13", type:"dialogue", speaker:"JERRY", text:"Are you serious?!", next:"sc2_choice2"},

  {id:"sc2_choice2", type:"choice", choices:[
    {label:"“Let’s stay calm and take a breather.”", next:"sc2_opt1_1"},
    {label:"“We have to create a new engine right now!”", next:"sc2_opt2_1"}
  ]},

  /* ---- Option 1: calm / empathize ---- */
  {id:"sc2_opt1_1", type:"dialogue", speaker:"JERRY", text:"How can I stay calm knowing that we’re going to be sucked into a black hole?", next:"sc2_opt1_2"},
  {id:"sc2_opt1_2", type:"dialogue", speaker:"ESTER", text:"I know we’re in danger, and I understand how you feel, but please, take a deep breath!", next:"sc2_opt1_3"},
  {id:"sc2_opt1_3", type:"dialogue", speaker:"JERRY", text:"I’m trying, but I can’t stop panicking!", next:"sc2_opt1_4"},
  {id:"sc2_opt1_4", type:"dialogue", speaker:"ESTER", text:"You are a chemical specialist, right? I saw a periodic table on the cover of your notebook. Sorry, I tend to focus on details more than others since I’m autistic.", next:"sc2_opt1_5"},
  {id:"sc2_opt1_5", type:"dialogue", speaker:"JERRY", text:"Oh, how interesting… I know a lot of autistic people, but now that I think of it, I never asked them what it was like to live with autism. Just out of pure curiosity, what’s it like for you?", next:"sc2_opt1_choice"},

  {id:"sc2_opt1_choice", type:"choice", choices:[
    {label:"Answer Jerry’s question.", next:"sc2_opt1_early_autism1"},
    {label:"Continue without inquiring into autism right away.", next:"sc2_opt1_late_propose"}
  ]},

  /* -- answered right away -- */
  {id:"sc2_opt1_early_autism1", type:"dialogue", speaker:"ESTER", text:"Like you addressed, lots of people tend to misunderstand me because I am autistic. I have been excluded from social groups throughout my life because people say that I’m academically incompetent, not able to understand sarcasm or hidden agendas, and that I miss the big picture because I pay attention to every detail. Speaking of attention to detail — sorry about being so nosy about your profession, I know a lot of people like to keep that stuff private…", next:"sc2_opt1_early_autism2"},
  {id:"sc2_opt1_early_autism2", type:"dialogue", speaker:"JERRY", text:"Actually, I feel quite the opposite. I’m super passionate about chemistry, and out of my time here at the space station, you are the first person who’s acknowledged this. I find it hard to contribute to everyone else’s conversations, since they’re all physicists. Wow — out of all things, being excluded from social groups is the last thing I expected to have in common with you…", next:"sc2_opt1_early_autism3"},
  {id:"sc2_opt1_early_autism3", type:"dialogue", speaker:"ESTER", text:"I feel the same. It’s actually really cool for me to talk with someone who has that same experience but is neurotypical.", next:"sc2_opt1_early_autism4"},
  {id:"sc2_opt1_early_autism4", type:"dialogue", speaker:"JERRY", text:"It’s my pleasure. Thanks for listening without judging.", next:"sc2_opt1_early_m1"},
  {id:"sc2_opt1_early_m1", type:"dialogue", speaker:"ESTER", text:"What are some of the scariest accidents you’ve had in the lab?", next:"sc2_opt1_early_m2"},
  {id:"sc2_opt1_early_m2", type:"dialogue", speaker:"JERRY", text:"I don’t know why you asked, but there was one time when I was trying to condense carbon monoxide and spilled the container, and the carbon monoxide evaporated again and began to spread around the lab. The door was also locked and there was no way for the gas to escape. I thought I was going to die.", next:"sc2_opt1_early_m3"},
  {id:"sc2_opt1_early_m3", type:"dialogue", speaker:"ESTER", text:"But you’re speaking to me right now, right? So how did you save yourself?", next:"sc2_opt1_early_m4"},
  {id:"sc2_opt1_early_m4", type:"dialogue", speaker:"JERRY", text:"I opened the fridge and spread ice everywhere in the lab I could — walls, floor, you name it. I was half-conscious for part of it, but finally it got cold enough for the gas to sink to the bottom and condense, which gave me enough time to get help before it warmed up again and the gas rose up.", next:"sc2_opt1_early_m5"},
  {id:"sc2_opt1_early_m5", type:"dialogue", speaker:"ESTER", text:"You see, even in a situation where you were about to die, you didn’t give up, even when half-conscious! How is this any different! We can’t give up in trying to survive, and even if we die, we’ll have put up a good fight.", next:"sc2_opt1_early_m6"},
  {id:"sc2_opt1_early_m6", type:"dialogue", speaker:"JERRY", text:"You’re right. Thanks for calming me down so much, I appreciate it.", next:"sc2_opt1_early_m7"},
  {id:"sc2_opt1_early_m7", type:"dialogue", speaker:"ESTER", text:"We have to make a new engine, which should take two hours individually. But if we work together, we might be able to finish before the hour passes.", next:"sc2_opt1_early_m8"},
  {id:"sc2_opt1_early_m8", type:"dialogue", speaker:"JERRY", text:"I don’t know how to make an engine.", next:"sc2_opt1_early_m9"},
  {id:"sc2_opt1_early_m9", type:"dialogue", speaker:"ESTER", text:"I know enough calculus and physics to construct a new engine! It’s hard, but I can outline what we basically need to do. Just pay attention and communicate, and we’ll be fine.", next:"sc2_opt1_early_m10"},
  {id:"sc2_opt1_early_m10", type:"dialogue", speaker:"JERRY", text:"Okay, sure. Anything to get out of here!", next:"sc2_opt1_early_m11"},
  {id:"sc2_opt1_early_m11", type:"inner", text:"Jerry is taking on my instructions really well… We might actually have a chance to get out!", next:"sc2_opt1_early_m12"},
  {id:"sc2_opt1_early_m12", type:"narration", text:"One hour later…", next:"sc2_opt1_early_m13"},
  {id:"sc2_opt1_early_m13", type:"dialogue", speaker:"ESTER", text:"Great job, Jerry! You picked up my instructions perfectly! We just need to screw this part in so we can attach the engine to the bottom of the ship.", next:"sc2_opt1_early_m14"},
  {id:"sc2_opt1_early_m14", type:"dialogue", speaker:"JERRY", text:"Done! I’ll put on my spacesuit and attach it outside. I’m quick with getting ready — I’ll get it done in five minutes!", next:"sc2_opt1_early_m15"},
  {id:"sc2_opt1_early_m15", type:"dialogue", speaker:"ESTER", text:"Jerry, great job! Thanks for working so hard and helping me quickly fix the engine!", next:"sc2_opt1_early_m16"},
  {id:"sc2_opt1_early_m16", type:"dialogue", speaker:"JERRY", text:"I should be thanking you… We wouldn’t have been able to build this without your knowledge and your skill in instructing me so well.", next:"sc2_opt1_end"},

  /* -- deflected, Jerry circles back after the engine's built -- */
  {id:"sc2_opt1_late_propose", type:"dialogue", speaker:"ESTER", text:"I appreciate you asking — maybe I can tell you about it later. But that’s not the point I’m making right now. Back to what I was saying: what are some of the scariest accidents you’ve had in the lab?", next:"sc2_opt1_late_m2"},
  {id:"sc2_opt1_late_m2", type:"dialogue", speaker:"JERRY", text:"I don’t know why you asked, but there was one time when I was trying to condense carbon monoxide and spilled the container, and the carbon monoxide evaporated again and began to spread around the lab. The door was also locked and there was no way for the gas to escape. I thought I was going to die.", next:"sc2_opt1_late_m3"},
  {id:"sc2_opt1_late_m3", type:"dialogue", speaker:"ESTER", text:"But you’re speaking to me right now, right? So how did you save yourself?", next:"sc2_opt1_late_m4"},
  {id:"sc2_opt1_late_m4", type:"dialogue", speaker:"JERRY", text:"I opened the freezer and spread ice everywhere in the lab I could — walls, floor, you name it. I was half-conscious for part of it, but finally it got cold enough for the gas to sink to the bottom and eventually condense, which gave me enough time to get help before it rose up again.", next:"sc2_opt1_late_m5"},
  {id:"sc2_opt1_late_m5", type:"dialogue", speaker:"ESTER", text:"You see, even in a situation where you were about to die, you didn’t give up, even when half-conscious! How is this any different! We can’t give up in trying to survive, and even if we die, we’ll have put up a good fight.", next:"sc2_opt1_late_m6"},
  {id:"sc2_opt1_late_m6", type:"dialogue", speaker:"JERRY", text:"You’re right. Thanks for calming me down so much, I appreciate it.", next:"sc2_opt1_late_m7"},
  {id:"sc2_opt1_late_m7", type:"dialogue", speaker:"ESTER", text:"We have to make a new engine, which should take two hours individually. But if we work together, we might be able to finish before the hour passes.", next:"sc2_opt1_late_m8"},
  {id:"sc2_opt1_late_m8", type:"dialogue", speaker:"JERRY", text:"I don’t know how to make an engine.", next:"sc2_opt1_late_m9"},
  {id:"sc2_opt1_late_m9", type:"dialogue", speaker:"ESTER", text:"I know enough calculus and physics to construct a new engine! It’s hard, but I can outline what we basically need to do. Just pay attention and communicate, and we’ll be fine.", next:"sc2_opt1_late_m10"},
  {id:"sc2_opt1_late_m10", type:"dialogue", speaker:"JERRY", text:"Okay, sure. Anything to get out of here!", next:"sc2_opt1_late_m11"},
  {id:"sc2_opt1_late_m11", type:"inner", text:"Jerry is taking on my instructions really well… We might actually have a chance to get out!", next:"sc2_opt1_late_m12"},
  {id:"sc2_opt1_late_m12", type:"narration", text:"One hour later…", next:"sc2_opt1_late_m13"},
  {id:"sc2_opt1_late_m13", type:"dialogue", speaker:"ESTER", text:"Great job, Jerry! You picked up my instructions perfectly! We just need to screw this part in so we can attach the engine to the bottom of the ship.", next:"sc2_opt1_late_m14"},
  {id:"sc2_opt1_late_m14", type:"dialogue", speaker:"JERRY", text:"Done! I’ll put on my spacesuit and attach it outside. I’m quick with getting ready — I’ll get it done in five minutes!", next:"sc2_opt1_late_attach"},
  {id:"sc2_opt1_late_attach", type:"narration", text:"Jerry attaches the engine to the ship.", next:"sc2_opt1_late_m15"},
  {id:"sc2_opt1_late_m15", type:"dialogue", speaker:"ESTER", text:"We’re done! Jerry, great job! Thanks for working so hard and helping me quickly fix the engine!", next:"sc2_opt1_late_m16"},
  {id:"sc2_opt1_late_m16", type:"dialogue", speaker:"JERRY", text:"I should be thanking you… We wouldn’t have been able to build this without your knowledge and your skill in instructing me so well. But I’m still curious — what’s it like for you, being autistic?", next:"sc2_opt1_late_autism1"},
  {id:"sc2_opt1_late_autism1", type:"dialogue", speaker:"ESTER", text:"Like you addressed earlier, lots of people tend to misunderstand me because I am autistic. I have been excluded from social groups throughout my life because people say that I’m academically incompetent, not able to understand sarcasm or hidden agendas, and that I miss the big picture because I pay attention to every detail. Speaking of attention to detail — sorry about being so nosy about your profession earlier, I know a lot of people like to keep that stuff private…", next:"sc2_opt1_late_autism2"},
  {id:"sc2_opt1_late_autism2", type:"dialogue", speaker:"JERRY", text:"Actually, I feel quite the opposite. I’m super passionate about chemistry, and out of my time here at the space station, you are the first person who’s acknowledged this. I find it hard to contribute to everyone else’s conversations, since they’re all physicists. Wow — out of all things, being excluded from social groups is the last thing I expected to have in common with you…", next:"sc2_opt1_late_autism3"},
  {id:"sc2_opt1_late_autism3", type:"dialogue", speaker:"ESTER", text:"I feel the same. It’s actually really cool for me to talk with someone who has that same experience but is neurotypical.", next:"sc2_opt1_late_autism4"},
  {id:"sc2_opt1_late_autism4", type:"dialogue", speaker:"JERRY", text:"It’s my pleasure. Thanks for listening without judging.", next:"sc2_opt1_end"},

  {id:"sc2_opt1_end", type:"inner", text:"After five minutes, Jerry attached the engine to the spaceship. It turned out to be even stronger than the suction of the black hole, and we managed to maneuver the space station far away. We went to get some dehydrated fruit from a kitchen cabinet, and alongside the packet of fruit, found a supply box full of tools to help construct the engine.", next:"sc2_opt1_recap"},
  {id:"sc2_opt1_recap", type:"recap", text:"Jerry and I have become more comfortable working as a team, despite our many differences. Knowing that we both don’t give up easily, I feel I can better understand why he makes decisions, which makes working with him in the future seem less daunting.", next:"sc3_open"},

  /* ---- Option 2: force it / reconcile later ---- */
  {id:"sc2_opt2_1", type:"dialogue", speaker:"JERRY", text:"Geez, I am going to fix it right now. You don’t have to be so harsh. I don’t know how to fix an engine, though.", next:"sc2_opt2_2"},
  {id:"sc2_opt2_2", type:"dialogue", speaker:"ESTER", text:"I know calculus and physics, which shouldn’t be too hard to translate into building an engine, so stop talking.", next:"sc2_opt2_3"},
  {id:"sc2_opt2_3", type:"dialogue", speaker:"JERRY", text:"Oh! If you know so much, why don’t you do it yourself?", next:"sc2_opt2_4"},
  {id:"sc2_opt2_4", type:"dialogue", speaker:"ESTER", text:"Fine!", next:"sc2_opt2_skip"},
  {id:"sc2_opt2_skip", type:"narration", text:"One hour later…", next:"sc2_opt2_5"},
  {id:"sc2_opt2_5", type:"inner", text:"I shouldn’t have lashed out at Jerry like that. He also wants to survive, and I shouldn’t have made him feel useless and powerless right now, when we need all the resources we can get to escape the black hole. I should talk to him.", next:"sc2_opt2_approach"},
  {id:"sc2_opt2_approach", type:"narration", text:"Ester comes up to Jerry.", next:"sc2_opt2_6"},
  {id:"sc2_opt2_6", type:"dialogue", speaker:"ESTER", text:"Jerry, I know that you are frustrated with how I behaved earlier, and rightfully so. I’m sorry for lashing out. I understand that you were just stressed about staying alive. Also, because I’m autistic, lots of people have misunderstood me, so it feels terrible to have to misunderstand someone else while being so disrespectful.", next:"sc2_opt2_ask"},
  {id:"sc2_opt2_ask", type:"dialogue", speaker:"JERRY", text:"How interesting… I know a lot of autistic people, but I always have trouble understanding them. What’s it like for you?", next:"sc2_opt2_choice"},

  {id:"sc2_opt2_choice", type:"choice", choices:[
    {label:"Answer Jerry’s question.", next:"sc2_opt2_early_autism1"},
    {label:"Continue without inquiring into autism right away.", next:"sc2_opt2_late_propose"}
  ]},

  /* -- answered right away -- */
  {id:"sc2_opt2_early_autism1", type:"dialogue", speaker:"ESTER", text:"Yeah, I often get quite stressed when something goes wrong with something I value, so I often lashed out during my childhood when, for example, my school routines were suddenly changed.", next:"sc2_opt2_early_autism2"},
  {id:"sc2_opt2_early_autism2", type:"dialogue", speaker:"JERRY", text:"What about the changed routines annoyed you so much?", next:"sc2_opt2_early_autism3"},
  {id:"sc2_opt2_early_autism3", type:"dialogue", speaker:"ESTER", text:"I like to work with structured routines in order to best ensure that tasks get done.", next:"sc2_opt2_early_autism4"},
  {id:"sc2_opt2_early_autism4", type:"dialogue", speaker:"JERRY", text:"I actually just realised… that’s been really helpful for finishing our work at the space station. We’re able to finish our routines about twice as quickly!", next:"sc2_opt2_early_autism5"},
  {id:"sc2_opt2_early_autism5", type:"dialogue", speaker:"ESTER", text:"Since I never explicitly mentioned that I work best when I have concrete plans, everyone thought I was just a bad person who enjoyed annoying others. To be honest, I feel the school just exiled me here because they didn’t want me to lash out anymore — not because I was incompetent by any means. As a result of my experience at school, I even began to sometimes doubt whether I would be able to interact with other people and be part of a community.", next:"sc2_opt2_early_autism6"},
  {id:"sc2_opt2_early_autism6", type:"dialogue", speaker:"JERRY", text:"While I definitely don’t think it was nice of you to lash out, I understand where you are coming from. I’ve also lashed out quite a bit among my previous coworkers on Earth, because we put so much work into our experiments that if anything goes wrong, I get very frustrated — especially considering that I want these experiments to have results that genuinely help people. My ex-coworkers also thought I just enjoyed annoying them, because I never straight-up said how mentally invested I was in these experiments. That’s why I was so panicked when we first met and the mercury spilled everywhere.", next:"sc2_opt2_early_autism7"},
  {id:"sc2_opt2_early_autism7", type:"dialogue", speaker:"ESTER", text:"Really? I should have known. Looking back, our introduction was quite interesting in how I got to see that side of you right away.", next:"sc2_opt2_early_autism8"},
  {id:"sc2_opt2_early_autism8", type:"dialogue", speaker:"JERRY", text:"I’m glad we can actually relate to that — in us both feeling very strongly about topics we are passionate about.", next:"sc2_opt2_early_propose"},

  {id:"sc2_opt2_early_propose", type:"dialogue", speaker:"ESTER", text:"Ultimately, the point I was making is that we both have the same goal. However, if we want to survive, we must work together to build the engine. I can quickly go over how to build it so you can understand the construction process. Would you be willing to help me?", next:"sc2_opt2_early_m2"},
  {id:"sc2_opt2_early_m2", type:"dialogue", speaker:"JERRY", text:"I appreciate your apology… Thanks for being so considerate of how I was thinking. I’m also sorry for leaving you so quickly. I’m ready to help you now.", next:"sc2_opt2_early_m3"},
  {id:"sc2_opt2_early_m3", type:"dialogue", speaker:"ESTER", text:"Great! Let’s get started!", next:"sc2_opt2_early_timeskip"},
  {id:"sc2_opt2_early_timeskip", type:"narration", text:"45 minutes and 59 seconds later…", next:"sc2_opt2_early_m4"},
  {id:"sc2_opt2_early_m4", type:"dialogue", speaker:"ESTER", text:"We made it out just in time! Jerry, thank you for coming back… literally and figuratively. I couldn’t have done it without your help.", next:"sc2_opt2_early_m5"},
  {id:"sc2_opt2_early_m5", type:"dialogue", speaker:"JERRY", text:"Same with you. Your skills got us here!", next:"sc2_opt2_end"},

  /* -- deflected, Jerry circles back after the engine's built -- */
  {id:"sc2_opt2_late_propose", type:"dialogue", speaker:"ESTER", text:"I appreciate you asking — but that’s not really the point I was making. We both have the same goal, and if we want to survive, we must work together to build the engine. I can quickly go over how to build it so you can understand the construction process. Would you be willing to help me?", next:"sc2_opt2_late_m2"},
  {id:"sc2_opt2_late_m2", type:"dialogue", speaker:"JERRY", text:"I appreciate your apology… Thanks for being so considerate of how I was thinking. I’m also sorry for leaving you so quickly. I’m ready to help you now.", next:"sc2_opt2_late_m3"},
  {id:"sc2_opt2_late_m3", type:"dialogue", speaker:"ESTER", text:"Great! Let’s get started!", next:"sc2_opt2_late_timeskip"},
  {id:"sc2_opt2_late_timeskip", type:"narration", text:"45 minutes and 59 seconds later…", next:"sc2_opt2_late_m4"},
  {id:"sc2_opt2_late_m4", type:"dialogue", speaker:"ESTER", text:"We made it out just in time! Jerry, thank you for coming back… literally and figuratively. I couldn’t have done it without your help.", next:"sc2_opt2_late_m5"},
  {id:"sc2_opt2_late_m5", type:"dialogue", speaker:"JERRY", text:"Same with you. Your skills got us here! Anyways, now that we’re safe — would you be willing to tell me about your experiences as an autistic person?", next:"sc2_opt2_late_autism1"},
  {id:"sc2_opt2_late_autism1", type:"dialogue", speaker:"ESTER", text:"Yeah, I often get quite stressed when something goes wrong with something I value, so I often lashed out during my childhood when, for example, my school routines were suddenly changed.", next:"sc2_opt2_late_autism2"},
  {id:"sc2_opt2_late_autism2", type:"dialogue", speaker:"JERRY", text:"What about the changed routines annoyed you so much?", next:"sc2_opt2_late_autism3"},
  {id:"sc2_opt2_late_autism3", type:"dialogue", speaker:"ESTER", text:"I like to work with structured routines in order to best ensure that tasks get done.", next:"sc2_opt2_late_autism4"},
  {id:"sc2_opt2_late_autism4", type:"dialogue", speaker:"JERRY", text:"I actually just realised… that’s been really helpful for finishing our work at the space station. We’re able to finish our routines about twice as quickly!", next:"sc2_opt2_late_autism5"},
  {id:"sc2_opt2_late_autism5", type:"dialogue", speaker:"ESTER", text:"Since I never explicitly mentioned that I work best when I have concrete plans, everyone thought I was just a bad person who enjoyed annoying others. To be honest, I feel the school just exiled me here because they didn’t want me to lash out anymore — not because I was incompetent by any means. As a result of my experience at school, I even began to sometimes doubt whether I would be able to interact with other people and be part of a community.", next:"sc2_opt2_late_autism6"},
  {id:"sc2_opt2_late_autism6", type:"dialogue", speaker:"JERRY", text:"While I definitely don’t think it was nice of you to lash out, I understand where you are coming from. I’ve also lashed out quite a bit among my previous coworkers on Earth, because we put so much work into our experiments that if anything goes wrong, I get very frustrated — especially considering that I want these experiments to have results that genuinely help people. My ex-coworkers also thought I just enjoyed annoying them, because I never straight-up said how mentally invested I was in these experiments. That’s why I was so panicked when we first met and the mercury spilled everywhere.", next:"sc2_opt2_late_autism7"},
  {id:"sc2_opt2_late_autism7", type:"dialogue", speaker:"ESTER", text:"Really? I should have known. Looking back, our introduction was quite interesting in how I got to see that side of you right away.", next:"sc2_opt2_late_autism8"},
  {id:"sc2_opt2_late_autism8", type:"dialogue", speaker:"JERRY", text:"I’m glad we can actually relate to that — in us both feeling very strongly about topics we are passionate about.", next:"sc2_opt2_end"},

  {id:"sc2_opt2_end", type:"inner", text:"I’m glad I managed to reconcile with Jerry. Although we still aren’t friends, it’s a relief to be able to better understand him and his emotions so we can work together.", next:"sc2_opt2_recap"},
  {id:"sc2_opt2_recap", type:"recap", text:"Jerry and I have become more comfortable with each other, despite our many differences. Now knowing that he is more similar to me than I expected — in the way that we both feel and act strongly about what we heavily value — I feel I can better understand why he makes decisions, which makes working with him in the future seem less daunting.", next:"sc3_open"},

  /* ============================================================
     SCENE 3 — Day 3: Coordination
     ============================================================ */

  {id:"sc3_open", type:"dialogue", speaker:"ESTER", text:"Jerry, you haven’t had lunch yet. Where are you?", next:"sc3_log1", showSprites:["ester"]},
  {id:"sc3_log1", type:"narration", text:"JERRY’S DATA LOG — 14 October 3043, 12:32 in the 24-hour cycle. I’m working in the telemetry data collection lab. Some problems with the data. I can’t wait until we’re out of here… even if that takes another fifty years, just the thought of it being possible makes me more willing to drag myself to work. Kind of.", next:"sc3_ester_lunch", showSprites:["jerry"]},
  {id:"sc3_ester_lunch", type:"dialogue", speaker:"ESTER", text:"Okay then, I won’t disturb you. Lunch is on the table whenever you’re finished.", next:"sc3_ester_leaves", showSprites:["jerry","ester"]},
  {id:"sc3_ester_leaves", type:"narration", text:"Ester leaves the room.", next:"sc3_log2"},
  {id:"sc3_log2", type:"narration", text:"JERRY’S DATA LOG — Photovoltaic data: trying to gauge connection. System 1 and System 3 are not connecting. System 2: four channels responsive, showing normal range of temperatures. Still, those other two systems are a problem. I guess I have to contact astronautics to see if they can do a spacewalk anytime soon.", next:"sc3_phone1", showSprites:["jerry"]},
  {id:"sc3_phone1", type:"dialogue", speaker:"JERRY", text:"Hello? Hello? If even the phones won’t connect, I swear to this black hole…", next:"sc3_noor1"},
  {id:"sc3_noor1", type:"dialogue", speaker:"NOOR", text:"Hi, this is Noor from astro. [Crackle] — help you with anything?", next:"sc3_jerry_aside"},
  {id:"sc3_jerry_aside", type:"dialogue", speaker:"JERRY", text:"At least the radio systems work…", next:"sc3_jerry_intro"},
  {id:"sc3_jerry_intro", type:"dialogue", speaker:"JERRY", text:"Noor, can you hear me? This is Jerry, from the nuclear physics department. We kind of need to get a spacewalk done on the photovoltaic systems, and probably a dozen other things.", next:"sc3_noor2"},
  {id:"sc3_noor2", type:"dialogue", speaker:"NOOR", text:"[Laughs] Yep, yep, there were like, a million other people saying the same thing today. You’re in luck, I have the time to pull this off. Send someone over from your department so we can do the—", next:"sc3_jerry_neg"},
  {id:"sc3_jerry_neg", type:"dialogue", speaker:"JERRY", text:"Negotiations. Ugh.", next:"sc3_noor3"},
  {id:"sc3_noor3", type:"dialogue", speaker:"NOOR", text:"Can’t be helped, buddy. So. Who should I be expecting?", next:"sc3_jerry_pick"},
  {id:"sc3_jerry_pick", type:"dialogue", speaker:"JERRY", text:"Mmm… hold the phone for a second. Uh, you’ll get Ester, the rookie.", next:"sc3_noor4"},
  {id:"sc3_noor4", type:"dialogue", speaker:"NOOR", text:"Great.", next:"sc3_jerry_hangup"},
  {id:"sc3_jerry_hangup", type:"dialogue", speaker:"JERRY", text:"Alright, I’m hanging up now.", next:"sc3_find_ester"},

  {id:"sc3_find_ester", type:"narration", text:"Jerry heads off to find Ester.", next:"sc3_jerry_call"},

  {id:"sc3_jerry_call", type:"dialogue", speaker:"JERRY", text:"Hey, Ester! Can you come over here for a second?", next:"sc3_ester_whats_up", showSprites:["jerry","ester"]},
  {id:"sc3_ester_whats_up", type:"dialogue", speaker:"ESTER", text:"Yes, what’s going on?", next:"sc3_jerry_explain1"},
  {id:"sc3_jerry_explain1", type:"dialogue", speaker:"JERRY", text:"So, do you know where the astronautics launch bay is located? We’re having all sorts of problems with the satellite receptors, since I think the photovoltaic systems have decided to give up.", next:"sc3_jerry_explain2"},
  {id:"sc3_jerry_explain2", type:"dialogue", speaker:"JERRY", text:"I called Noor, who does some stuff for maintenance, and she’s fine with doing a spacewalk. We just need someone from our department to… er, “coordinate” with the other departments about it.", next:"sc3_ester_q1"},
  {id:"sc3_ester_q1", type:"dialogue", speaker:"ESTER", text:"Okay… so what does this “coordination” mean? Do you want me to ask them for data? Resources?", next:"sc3_jerry_sorry"},
  {id:"sc3_jerry_sorry", type:"dialogue", speaker:"JERRY", text:"I’m so sorry, Ester. I know you’re a rookie and all, but we all have to learn the ropes sooner or later.", next:"sc3_choice1"},

  {id:"sc3_choice1", type:"choice", choices:[
    {label:"Push for an explanation and try to gain clarity before starting the task.", next:"sc3_pushA_1"},
    {label:"Accept the lack of clarity and figure it out yourself.", next:"sc3_acceptB_1"}
  ]},

  /* -- pushed for an explanation -- */
  {id:"sc3_pushA_1", type:"dialogue", speaker:"ESTER", text:"Jerry, I have no idea what you’re trying to say.", next:"sc3_pushA_2"},
  {id:"sc3_pushA_2", type:"dialogue", speaker:"JERRY", text:"Right. Sorry. So “coordination” mostly means you argue with all the other departments that absolutely hate us and want us to give up our share of the funding money.", next:"sc3_pushA_3"},
  {id:"sc3_pushA_3", type:"dialogue", speaker:"JERRY", text:"Theoretically, you’re just notifying them that astronautics is going to do the spacewalk, but they’re going to try to argue with you. And what you said about wrestling data out of them is true — you just have to be very, very careful about how you ask it.", next:"sc3_pushA_4"},
  {id:"sc3_pushA_4", type:"dialogue", speaker:"ESTER", text:"That sounds painful. So, who are we talking to?", next:"sc3_pushA_5"},
  {id:"sc3_pushA_5", type:"dialogue", speaker:"JERRY", text:"Biology. Oh, and you’re going to talk over the phone, so you just have to hope for someone nice to answer you.", next:"sc3_pushA_6"},
  {id:"sc3_pushA_6", type:"dialogue", speaker:"ESTER", text:"And what does “someone nice” entail?", next:"sc3_pushA_7"},
  {id:"sc3_pushA_7", type:"dialogue", speaker:"JERRY", text:"Tadej Wojciechowski and Catherine St James.", next:"sc3_pushA_8"},
  {id:"sc3_pushA_8", type:"dialogue", speaker:"ESTER", text:"Thanks. Hand me the phone, please. I’ll do my best.", next:"sc3_merge1"},

  /* -- accepted the lack of clarity -- */
  {id:"sc3_acceptB_1", type:"dialogue", speaker:"ESTER", text:"Okay, in that case, hand me the phone, please. I’ll do my best.", next:"sc3_merge1"},

  {id:"sc3_merge1", type:"dialogue", speaker:"JERRY", text:"Okay then, I’ll go get the data we have organized so Noor has something to work with. Wave at me if there’s something bad going on.", next:"sc3_inner1"},
  {id:"sc3_inner1", type:"inner", text:"I’d gotten familiar with most of my own department, what kind of people they are, and how I should navigate around them. But then — suddenly having to reach out to all these other people, people who seemed to be even more hostile than I’d been used to? I did get kind of mad at Jerry, but what he said about me needing to get accustomed was correct. I dialed Biology. First thing I asked: “Hello, I’m Ester from the Nuclear Physics department. Who am I talking to?” The answer was not one of the two names Jerry mentioned.", next:"sc3_judith1", showSprites:["ester"]},

  {id:"sc3_judith1", type:"dialogue", speaker:"JUDITH", text:"I’m Judith. What is it?", next:"sc3_ester_explain"},
  {id:"sc3_ester_explain", type:"dialogue", speaker:"ESTER", text:"We are conducting a spacewalk to make alterations to the telemetry systems, specifically the photovoltaic devices that are experiencing significant difficulties. Our department needs your help to determine any potential issues our associate in astronautics may face.", next:"sc3_judith2"},
  {id:"sc3_judith2", type:"dialogue", speaker:"JUDITH", text:"[Sighs] Ester, huh? Heard that the nuclear folks got someone new. And that you got into some kind of problem in your first shadowing session…", next:"sc3_ester_explain2"},
  {id:"sc3_ester_explain2", type:"dialogue", speaker:"ESTER", text:"Yes, a device broke and we had to seal off the room because of a mercury leak, but we got that under control. Why do you ask?", next:"sc3_judith3"},
  {id:"sc3_judith3", type:"dialogue", speaker:"JUDITH", text:"Doesn’t matter. Why would you need data?", next:"sc3_ester_explain3"},
  {id:"sc3_ester_explain3", type:"dialogue", speaker:"ESTER", text:"As the biology department, you would have all the information about the health condition of the astronauts in past spacewalks, correct? And you would be responsible for monitoring them during their spacewalk too?", next:"sc3_judith4"},
  {id:"sc3_judith4", type:"dialogue", speaker:"JUDITH", text:"You have no idea what you’re doing, kid. Hand the phone to Jerry.", next:"sc3_choice2"},

  {id:"sc3_choice2", type:"choice", choices:[
    {label:"Make your case with Judith and prioritize proving yourself to Jerry.", next:"sc3_case_1"},
    {label:"Gesture to Jerry to get his help and prioritize getting the data.", next:"sc3_gesture_1"}
  ]},

  /* -- Choice 1: make your case -- */
  {id:"sc3_case_1", type:"dialogue", speaker:"ESTER", text:"Judith, I would appreciate it if you took me seriously for a moment. I’m not great at talking to other people; it’s why I’m here in the first place. But — I think you already know what you, as the biology department, are supposed to do during a spacewalk. What did you even mean, “why would you need data”? What’s the point of negotiating over resources? What if one day you need something we collected, just as we need your data now — then what do you do? It’s not like you’ve been trained to interpret our data yourselves.", next:"sc3_case_2"},
  {id:"sc3_case_2", type:"dialogue", speaker:"JUDITH", text:"Alright. Alright. I guess it would be kind of hard to argue past you. [Laughs] But genuinely: not a single cent of funding can go to waste. Why would we even give that much to nuclear? Consider the costs — a small fortune to construct a tiny device, and then no purpose to even use it for. First of all, making a nuclear reactor on this ship is pointless; we have our energy needs met. Second: it’s a walking disaster in the making.", next:"sc3_case_3"},
  {id:"sc3_case_3", type:"dialogue", speaker:"ESTER", text:"And who from our department told you that we were making a nuclear reactor?", next:"sc3_case_4"},
  {id:"sc3_case_4", type:"dialogue", speaker:"JUDITH", text:"Well…", next:"sc3_case_5"},
  {id:"sc3_case_5", type:"dialogue", speaker:"ESTER", text:"As I said: our departments are useless if we don’t have data from other departments. That is why I haven’t hung up on you yet. And nuclear physics doesn’t automatically mean that we go straight to building a full-size reactor. Furthermore, as for that “walking disaster” bit — would it not be more of an issue if you created a synthetic illness and killed us all?", next:"sc3_case_6"},
  {id:"sc3_case_6", type:"dialogue", speaker:"JUDITH", text:"Look, why in the world would you automatically think we’re trying to create a— Oh. Okay. [Sighs] Alright then, I’ll give you the data you need.", next:"sc3_case_narration"},
  {id:"sc3_case_narration", type:"narration", text:"Ester hangs up. Jerry walks over, grinning.", next:"sc3_case_jerry", showSprites:["jerry","ester"]},
  {id:"sc3_case_jerry", type:"dialogue", speaker:"JERRY", text:"I heard your conversation. Nice job! I’ll wait on the mail inbox. Noor will be delighted…", next:"sc3_case_recap"},
  {id:"sc3_case_recap", type:"recap", text:"Jerry and the biology department now respect your knowledge and tenacity.", next:"sc4_open_inner1"},

  /* -- Choice 2: gesture to Jerry -- */
  {id:"sc3_gesture_1", type:"inner", text:"No clue what to do with all this. At least I had managed, for a little bit. I waved frantically at Jerry — on the other side of the room, fiddling with his telemetry devices and cursing under his breath. His eyes went wide, and he immediately abandoned it to take the phone out of my hand.", next:"sc3_gesture_2", showSprites:["jerry","ester"]},
  {id:"sc3_gesture_2", type:"dialogue", speaker:"JERRY", text:"Judith! You’ve barely even met Ester, the hell are you yelling at her for? All we are asking for is just a little bit of your precious, precious data, and machines to see if our astronaut is still freaking breathing or not… What do you mean we don’t deserve to get the telemetry systems fixed? I’m going to—", next:"sc3_gesture_3"},
  {id:"sc3_gesture_3", type:"inner", text:"He said a number of things I’ve never heard used in such a . . . creative manner before.", next:"sc3_gesture_4"},
  {id:"sc3_gesture_4", type:"narration", text:"They went back and forth like that for a while, each end defending their department’s honor like it was the last line of appeal from being flung into the black hole itself. It ended with Jerry slamming the receiver down. He put his head in his hands, sighed deeply, and then teetered toward the door.", next:"sc3_gesture_5"},
  {id:"sc3_gesture_5", type:"dialogue", speaker:"JERRY", text:"Sorry you had to hear that. Fix up the rest of the measurements, please — I’m going to find Tadej. I swear, I can get absolutely nowhere with those idiots in Bio without him in the room to mediate…", next:"sc3_gesture_recap"},
  {id:"sc3_gesture_recap", type:"recap", text:"Jerry fully accepted you into the “nuclear” team in your grand struggles against technology, governance, and the other departments — though you still have to steer clear of Biology.", next:"sc4_open_inner1"},

  /* ============================================================
     SCENE 4 — Night Shift: Aerospace Engineering
     ============================================================ */

  {id:"sc4_open_inner1", type:"inner", text:"It’s a nice “night” out. That’s what Jerry calls this, anyways. We usually work in shifts here — once every two weeks or so, it’s someone’s turn to work the graveyard shift. Basically just being a supervisor for the “night” crew so everything’s smooth when everyone’s sleeping.", next:"sc4_open_inner2", showSprites:["jerry","ester"]},
  {id:"sc4_open_inner2", type:"inner", text:"I’m pretty sure nobody likes night shifts. Except for me. It’s quiet out, and I can think.", next:"sc4_ester_jerry1"},
  {id:"sc4_ester_jerry1", type:"dialogue", speaker:"ESTER", text:"Jerry, I’m working tonight. I think we had a request from the aerospace engineering department to help them with a design. I’ll send a message to everyone that I’ll be there in case they need something.", next:"sc4_jerry_night"},
  {id:"sc4_jerry_night", type:"dialogue", speaker:"JERRY", text:"Alright. Goodnight, Ester.", next:"sc4_ester_night"},
  {id:"sc4_ester_night", type:"dialogue", speaker:"ESTER", text:"Goodnight.", next:"sc4_walk_to_aerospace"},

  // free_roam control node — the player walks Ester left, out of the lab and into the aerospace department
  {id:"sc4_walk_to_aerospace", type:"control", action:"free_roam", minX:20, maxX:720, targetX:160, next:"sc4_arrive_aerospace", showSprites:["ester"], reveal:["aerospace-placeholder"]},

  {id:"sc4_arrive_aerospace", type:"narration", text:"The aerospace engineering department is cluttered and full of half-finished projects, with a few enthusiastic scientists staying up late to add finishing touches to their work.", next:"sc4_ester_intro1"},
  {id:"sc4_ester_intro1", type:"dialogue", speaker:"ESTER", text:"Um, hello. I’m Ester, a recent addition to the nuclear engineering department. It’s nice to meet you. Seeing as we’re all engineers, I hope we can cooperate well together.", next:"sc4_cameron1"},
  {id:"sc4_cameron1", type:"dialogue", speaker:"CAMERON", text:"Hello Ester, I’m Cameron! I hope we can cooperate too. Graveyard shift tonight?", next:"sc4_inner_graveyard"},
  {id:"sc4_inner_graveyard", type:"inner", text:"“Graveyard shift” is a funny way to put it, but Jerry likes this phrase.", next:"sc4_ester_yes"},
  {id:"sc4_ester_yes", type:"dialogue", speaker:"ESTER", text:"Yes. I’m looking forward to it.", next:"sc4_cameron2"},
  {id:"sc4_cameron2", type:"dialogue", speaker:"CAMERON", text:"[Laughs] Ugh, I wish I was. My aerospace people are really good in that they don’t complain about the stuff they do. They love it!", next:"sc4_zinnia_offscreen"},
  {id:"sc4_zinnia_offscreen", type:"narration", text:"An aerospace engineer, working on a strangely lopsided-looking design, calls out from offscreen.", next:"sc4_zinnia1"},
  {id:"sc4_zinnia1", type:"dialogue", speaker:"ZINNIA", text:"Sir yes sir!", next:"sc4_cameron3"},
  {id:"sc4_cameron3", type:"dialogue", speaker:"CAMERON", text:"Come on! Stop calling me that, it makes me sound like your landlord. Well, I don’t like working late at night much. I like sleeping.", next:"sc4_inner_perturbed1"},
  {id:"sc4_inner_perturbed1", type:"inner", text:"I felt vaguely perturbed by this statement. Did they not want to work with me right now?", next:"sc4_inner_perturbed2"},
  {id:"sc4_inner_perturbed2", type:"inner", text:"It’s something my roommate used to say in university when she wanted me to turn the lights off. And then got mad at me when I told her to just go to sleep.", next:"sc4_ester_sleep"},
  {id:"sc4_ester_sleep", type:"dialogue", speaker:"ESTER", text:"We all love sleeping. It’s nice to get some quiet time to work, though. You can go ahead and take a nap while I take a look at the energy systems on that pod you requested Nuclear for. Are the workrooms dark enough for that?", next:"sc4_cameron4"},
  {id:"sc4_cameron4", type:"dialogue", speaker:"CAMERON", text:"What? No way I’m leaving you alone to do all the heavy lifting out here. You have supervising duty too! What if the electricians suddenly get into an argument over the coffee machine? And then they barge in fighting while you’re busy doing some welding or something? And I was asleep in the side room?", next:"sc4_cameron5"},
  {id:"sc4_cameron5", type:"dialogue", speaker:"CAMERON", text:"Oh — hold on a second. Zinnia! Go to bed already!", next:"sc4_zinnia2"},
  {id:"sc4_zinnia2", type:"dialogue", speaker:"ZINNIA", text:"Ok, ok. Good luck with the Nuclear kid, boss. Night.", next:"sc4_cameron6"},
  {id:"sc4_cameron6", type:"dialogue", speaker:"CAMERON", text:"Goodnight, Zin.", next:"sc4_cameron7"},
  {id:"sc4_cameron7", type:"dialogue", speaker:"CAMERON", text:"Anyways, I think it’ll be fine. You can work on that and ask me any questions you have about the design. I will be sitting by the telecom.", next:"sc4_ester_zoned"},
  {id:"sc4_ester_zoned", type:"dialogue", speaker:"ESTER", text:"Er — well, great. Don’t mind me if I look like I’ve zoned out. I know it may sound like an excuse, but I’m probably trying to figure a problem out.", next:"sc4_cameron8"},
  {id:"sc4_cameron8", type:"dialogue", speaker:"CAMERON", text:"Happens to all of us.", next:"sc4_ester_suppose"},
  {id:"sc4_ester_suppose", type:"dialogue", speaker:"ESTER", text:"I suppose so?", next:"sc4_inner_bigdeal1"},
  {id:"sc4_inner_bigdeal1", type:"inner", text:"To be honest, I have no idea what to say or feel. Obviously this person is a big deal. Head of aerospace engineering? Even nominally, to the degree that people call you “sir” and “boss”?", next:"sc4_inner_bigdeal2"},
  {id:"sc4_inner_bigdeal2", type:"inner", text:"A spaceship is no place to take aerospace engineering jokingly. The prestigious research organizations have nightmarish rumors following the names of their aerospace engineering captains.", next:"sc4_cameron9"},
  {id:"sc4_cameron9", type:"dialogue", speaker:"CAMERON", text:"[Yawns] I suppose so too. The project’s up there. Yell down at me if you have anything urgent.", next:"sc4_ester_thanks"},
  {id:"sc4_ester_thanks", type:"dialogue", speaker:"ESTER", text:"Thank you.", next:"sc4_bigprojects1"},

  {id:"sc4_bigprojects1", type:"narration", text:"Ester heads to the corner of the room where the “big projects” are kept — a spacious, clean, warehouse-like area, its walls covered in little notes and posters from the engineers.", next:"sc4_bigprojects2"},
  {id:"sc4_bigprojects2", type:"narration", text:"The project she’s meant to work on is split into several components. Most are half-covered by canvas sheets, but one — the heating unit — is left open, the whole section partitioned off with tape.", next:"sc4_inner_beautiful"},
  {id:"sc4_inner_beautiful", type:"inner", text:"A beautiful device, alright. I would have lobbied hard to get these sorts of parts for projects, from university up to now. Still—", next:"sc4_ester_honest"},
  {id:"sc4_ester_honest", type:"dialogue", speaker:"ESTER", text:"Cameron, I’m going to be honest: I have no idea who you put on this. They don’t really know how safety for commercial heating units works.", next:"sc4_cameron10"},
  {id:"sc4_cameron10", type:"dialogue", speaker:"CAMERON", text:"You can say that again. I even noticed it was like they were trying to fit a jet propulsion unit into a little box. And the welding — I don’t even want to look at it!", next:"sc4_ester_notawful"},
  {id:"sc4_ester_notawful", type:"dialogue", speaker:"ESTER", text:"It’s not too awful from a heating standpoint. Heating units are stuff secondary school children make without killing everyone in the room.", next:"sc4_cameron11"},
  {id:"sc4_cameron11", type:"dialogue", speaker:"CAMERON", text:"Well, yes. I was mostly joking. But the welding is pretty bad.", next:"sc4_inner_joking"},
  {id:"sc4_inner_joking", type:"inner", text:"“I was joking.” Three worst words to hear. What kind of tone was that said with? Annoyed? Amused? For now, I’ll assume it’s said with annoyance and try to keep them happy with me. . . my department really can’t handle a funding cut at this time.", next:"sc4_ester_reweld"},
  {id:"sc4_ester_reweld", type:"dialogue", speaker:"ESTER", text:"Yes, I’ll re-weld everything right away.", next:"sc4_ester_pitch"},
  {id:"sc4_ester_pitch", type:"dialogue", speaker:"ESTER", text:"But first, what do you think of a small radioisotope heating unit? I’m looking for adaptations to make it safer for human use. It needs to fit the Universal Nuclear Occupational Safety Requirements. It could work for a long time, so long as we remember to sequester it into a failsafe area, and then pipe the heat into the main unit. . .", next:"sc4_ester_idea"},
  {id:"sc4_ester_idea", type:"dialogue", speaker:"ESTER", text:"Oh! I have an idea. Give me a moment.", next:"sc4_cameron12"},
  {id:"sc4_cameron12", type:"dialogue", speaker:"CAMERON", text:"Take all the time you need. You’re pretty passionate! Shame you’re not in my department.", next:"sc4_inner_notaero"},
  {id:"sc4_inner_notaero", type:"inner", text:"Well, yes, I’m not in the aerospace engineering department because I’m not an aerospace engineer. I don’t think it’s smart to say that though.", next:"sc4_ester_blueprint"},
  {id:"sc4_ester_blueprint", type:"dialogue", speaker:"ESTER", text:"I’m getting a blueprint right now. It’s something you guys can take a look over and decide whether you want to keep it or not tomorrow.", next:"sc4_cameron13"},
  {id:"sc4_cameron13", type:"dialogue", speaker:"CAMERON", text:"No need. I’ll just pull up some tests right now and run your idea through once the design’s done.", next:"sc4_cameron14"},
  {id:"sc4_cameron14", type:"dialogue", speaker:"CAMERON", text:"Oh, and don’t worry about the telecom! It may seem like I’m trying to get away from the angry phone calls, but I can hear it if it goes off.", next:"sc4_ester_gotit"},
  {id:"sc4_ester_gotit", type:"dialogue", speaker:"ESTER", text:"Um, yeah. Got it.", next:"sc4_tablet"},
  {id:"sc4_tablet", type:"narration", text:"Cameron pulls up a tablet — some kind of fancy computer replacement, space tech maybe — and sets it up near Ester.", next:"sc4_cameron15"},
  {id:"sc4_cameron15", type:"dialogue", speaker:"CAMERON", text:"It’ll only take a second. . . aaand, I’ve locked it down. Send me your design as soon as you’re done.", next:"sc4_ester_sorry_design"},
  {id:"sc4_ester_sorry_design", type:"dialogue", speaker:"ESTER", text:"Sorry if the design’s not very good. It could look a bit rushed. And the numbers may not make sense. Sorry.", next:"sc4_cameron16"},
  {id:"sc4_cameron16", type:"dialogue", speaker:"CAMERON", text:"It’s alright! Don’t sweat it. It looks nicely planned out! I like the addition of those fuel rod adjustments you made.", next:"sc4_cameron17"},
  {id:"sc4_cameron17", type:"dialogue", speaker:"CAMERON", text:"Small things like that add up, should give a much better human interactive design.", next:"sc4_inner_terrifying"},
  {id:"sc4_inner_terrifying", type:"inner", text:"They took my design and put all the details into that testing program after just a single glance at the blueprint. Terrifying.", next:"sc4_cameron18"},
  {id:"sc4_cameron18", type:"dialogue", speaker:"CAMERON", text:"So, Ester, why’re you in here with us?", next:"sc4_ester_prison"},
  {id:"sc4_ester_prison", type:"dialogue", speaker:"ESTER", text:"Sounds like we’re in prison.", next:"sc4_cameron19"},
  {id:"sc4_cameron19", type:"dialogue", speaker:"CAMERON", text:"Well, it seemed like that at the start. But you get lots of opportunities to prove yourself.", next:"sc4_cameron20"},
  {id:"sc4_cameron20", type:"dialogue", speaker:"CAMERON", text:"What happened back at home to end up in this garbage dump?", next:"sc4_inner_hardtopic"},
  {id:"sc4_inner_hardtopic", type:"inner", text:"This is the most difficult conversation topic, the ultimate chip on everyone’s shoulders. The one thing you don’t just bring up — at least, the number one thing I’d rather keep close to my chest.", next:"sc4_answer_choice"},

  {id:"sc4_answer_choice", type:"choice", choices:[
    {label:"Keep it vague and downplay it.", next:"sc4_resp_ll"},
    {label:"Be casual but explain what happened.", next:"sc4_resp_hl"},
    {label:"Give a formal, guarded answer.", next:"sc4_resp_lh"},
    {label:"Give a full, honest explanation.", next:"sc4_resp_hh"}
  ]},

  {id:"sc4_resp_ll", type:"dialogue", speaker:"ESTER", text:"Nothing too bad. Just. . . could’ve done better in university, I guess. It was hard to keep up with all the politicking going on, and I wasn’t feeling my best when the internship applications rolled around.", next:"sc4_cameron_reflect"},
  {id:"sc4_resp_hl", type:"dialogue", speaker:"ESTER", text:"Everyone there didn’t understand what I was saying, ever. And then my entire department started hating me, especially my advisor — and then I found out I got kicked out. For this field, nuclear, that is, it’s really important to keep things safe. I think I complained too much.", next:"sc4_cameron_reflect"},
  {id:"sc4_resp_lh", type:"dialogue", speaker:"ESTER", text:"University was difficult, and I had a lot of complicated events going on in my personal life when internships were due. This place just seemed like the best conclusion for where my life was at.", next:"sc4_cameron_reflect"},
  {id:"sc4_resp_hh", type:"dialogue", speaker:"ESTER", text:"There were a lot of misunderstandings going on in my department. I gained a bad reputation for being uncooperative and stuck-up, but really there were some genuinely concerning choices being made for a field as dangerous as mine. My advisor complained about my so-called “work quality” enough to get me moved out to this place. I think he just decided he was sick of dealing with me.", next:"sc4_cameron_reflect"},

  {id:"sc4_cameron_reflect", type:"dialogue", speaker:"CAMERON", text:"I see. Sorry, I probably shouldn’t have asked that question. I’ll tell you what happened to me in exchange for making you say that.", next:"sc4_cameron_story1"},
  {id:"sc4_cameron_story1", type:"dialogue", speaker:"CAMERON", text:"I got accused of cheating in my dissertation — not sure who it came from, but somehow I had managed to come up with the exact same design as some dusty old concept in the back of the library.", next:"sc4_cameron_story2"},
  {id:"sc4_cameron_story2", type:"dialogue", speaker:"CAMERON", text:"It was a big deal. I made a long defense of myself and everything, but still chose to leave after that. And that’s why I’m here!", next:"sc4_ester_thanks_telling"},
  {id:"sc4_ester_thanks_telling", type:"dialogue", speaker:"ESTER", text:"Oh — well, um, thanks for telling me that. I appreciate the consideration.", next:"sc4_cameron_noproblem"},
  {id:"sc4_cameron_noproblem", type:"dialogue", speaker:"CAMERON", text:"No problem.", next:"sc4_cameron_uncomfortable1"},
  {id:"sc4_cameron_uncomfortable1", type:"dialogue", speaker:"CAMERON", text:"Although. . . are you uncomfortable with me making you talk so much? Please be honest. I can tell you like your work.", next:"sc4_cameron_uncomfortable2"},
  {id:"sc4_cameron_uncomfortable2", type:"dialogue", speaker:"CAMERON", text:"I realize I’m probably distracting you from it. I have a bad habit of running my mouth a lot! And — you seem a little nervous?", next:"sc4_ester_focus"},
  {id:"sc4_ester_focus", type:"dialogue", speaker:"ESTER", text:"Please don’t take offense, but I’d like to focus a little better. Thanks for doing the tests for my projects though.", next:"sc4_cameron_noffense"},
  {id:"sc4_cameron_noffense", type:"dialogue", speaker:"CAMERON", text:"Oh, no, no. I won’t take offense. My own people all tell me to shut up in much less polite terms than that!", next:"sc4_cameron_plausible"},
  {id:"sc4_cameron_plausible", type:"dialogue", speaker:"CAMERON", text:"And your idea seems pretty plausible, by the way, just needs the numbers to be filled out. Then I’ll do a proper analysis and get back to you.", next:"sc4_cameron_telecom"},
  {id:"sc4_cameron_telecom", type:"dialogue", speaker:"CAMERON", text:"And that reminds me. I need to get back to the telecom. Sorry for keeping you!", next:"sc4_recap"},
  {id:"sc4_recap", type:"recap", text:"Cameron is well intentioned enough and very competent. It seems you’ve gotten yourself a new ally.", next:"sc5_open"},

  /* ============================================================
     SCENE 5 — Interdepartmental Call
     ============================================================ */

  {id:"sc5_open", type:"narration", text:"A still shot of the black hole, its light flickering in the distance. Noor floats in the corner of the frame, tethered just outside the station.", next:"sc5_noor1", showSprites:[]},
  {id:"sc5_noor1", type:"dialogue", speaker:"NOOR", text:"I’m near the bay window in Bio. Can you tell me the biometrics you got?", next:"sc5_judith1"},
  {id:"sc5_judith1", type:"dialogue", speaker:"JUDITH", text:"Yeah. All stable for now. You’ve got 64 minutes left.", next:"sc5_noor2"},
  {id:"sc5_noor2", type:"dialogue", speaker:"NOOR", text:"Nice, nice. I can see the black hole up close, and the I-329 settlement. Faintly. I-329 Central Tower is still burning bright.", next:"sc5_judith2"},
  {id:"sc5_judith2", type:"dialogue", speaker:"JUDITH", text:"Noor, I know.", next:"sc5_noor3"},
  {id:"sc5_noor3", type:"dialogue", speaker:"NOOR", text:"Just wanted to say!", next:"sc5_judith3"},
  {id:"sc5_judith3", type:"dialogue", speaker:"JUDITH", text:"Mhm. . . passing off to Nuclear now.", next:"sc5_cut_aerospace"},

  {id:"sc5_cut_aerospace", type:"narration", text:"The call patches through to the aerospace engineering department, where Ester, Cameron, and Jerry are gathered around the telecom.", next:"sc5_jerry1", showSprites:["jerry","ester"], positions:{jerry:200, ester:170}},

  {id:"sc5_jerry1", type:"dialogue", speaker:"JERRY", text:"Hi Noor, this is Jerry. How far away from the radio receivers are you? I’d really love it if you don’t get sick out there because Judith keeps complaining in your ear.", next:"sc5_judith4"},
  {id:"sc5_judith4", type:"dialogue", speaker:"JUDITH", text:"Shut up, Jerry.", next:"sc5_jerry2"},
  {id:"sc5_jerry2", type:"dialogue", speaker:"JERRY", text:"I’m in the Aerospace Engineering department working on that pod they bring up to you a lot.", next:"sc5_noor4"},
  {id:"sc5_noor4", type:"dialogue", speaker:"NOOR", text:"Really? I hear so much about it! It would save us so much time out here. And I wouldn’t have to worry so much about getting fried by radioactive rays!", next:"sc5_ester1"},

  {id:"sc5_ester1", type:"dialogue", speaker:"ESTER", text:"Is that Judith?", next:"sc5_jerry3"},
  {id:"sc5_jerry3", type:"dialogue", speaker:"JERRY", text:"[Sighs] Yeah.", next:"sc5_cameron1"},
  {id:"sc5_cameron1", type:"dialogue", speaker:"CAMERON", text:"What happened to Katherine and Tadej?", next:"sc5_jerry4"},
  {id:"sc5_jerry4", type:"dialogue", speaker:"JERRY", text:"Missing in action.", next:"sc5_ester2"},
  {id:"sc5_ester2", type:"dialogue", speaker:"ESTER", text:"I’ve never heard that used before.", next:"sc5_jerry5"},
  {id:"sc5_jerry5", type:"dialogue", speaker:"JERRY", text:"It means that I have no clue where they are.", next:"sc5_ester3"},
  {id:"sc5_ester3", type:"dialogue", speaker:"ESTER", text:"Thank you.", next:"sc5_cameron2"},
  {id:"sc5_cameron2", type:"dialogue", speaker:"CAMERON", text:"I really don’t know where they’ve been for a while now.", next:"sc5_cameron3"},
  {id:"sc5_cameron3", type:"dialogue", speaker:"CAMERON", text:"One of my engineers wanted to try growing fig trees in the agriculture wings, but couldn’t get a hold of either of them! Did we send them out for supplies?", next:"sc5_jerry6"},
  {id:"sc5_jerry6", type:"dialogue", speaker:"JERRY", text:"Well. Cam, I think that’s the kind of thing you would know.", next:"sc5_cameron4"},
  {id:"sc5_cameron4", type:"dialogue", speaker:"CAMERON", text:"Maybe? I really don’t know, though. I feel like none of us have sent out a group to I-239 in a long time, and furthermore we don’t really have the money to — Zin was even thinking of scrapping her project so we’d have funds to rebuild a part of the agricultural section.", next:"sc5_jerry7"},
  {id:"sc5_jerry7", type:"dialogue", speaker:"JERRY", text:"Nuclear doesn’t have a lot of stuff to sell. So our main project is basically your project too.", next:"sc5_jerry8"},
  {id:"sc5_jerry8", type:"dialogue", speaker:"JERRY", text:"Oh, yes, and our department head’s been handling politics for so long I haven’t seen him for a very long time.", next:"sc5_judith5"},
  {id:"sc5_judith5", type:"dialogue", speaker:"JUDITH", text:"Your department head is useless if he can’t get you guys some kind of funding after two months.", next:"sc5_jerry9"},
  {id:"sc5_jerry9", type:"dialogue", speaker:"JERRY", text:"What do you want? We’re trying to discuss within-department right now.", next:"sc5_jerry10"},
  {id:"sc5_jerry10", type:"dialogue", speaker:"JERRY", text:"Does Noor need the coordinates for the photovoltaic systems?", next:"sc5_noor5"},
  {id:"sc5_noor5", type:"dialogue", speaker:"NOOR", text:"No, it’s not that, I’m already there. I just need to tell you guys about the state of the damage.", next:"sc5_jerry11"},
  {id:"sc5_jerry11", type:"dialogue", speaker:"JERRY", text:"[Sighs] Alright, how bad is it?", next:"sc5_noor6"},
  {id:"sc5_noor6", type:"dialogue", speaker:"NOOR", text:"Bad! Something’s knocked into the second receptor. It’s absolutely unsightly. How pricey is replacement?", next:"sc5_jerry12"},
  {id:"sc5_jerry12", type:"dialogue", speaker:"JERRY", text:"Do you remember, Ester? It doesn’t sound good at all.", next:"sc5_ester4"},
  {id:"sc5_ester4", type:"dialogue", speaker:"ESTER", text:"From what I remember in school, our receptor had a moderately important replacement and it took 600k in credits.", next:"sc5_ester5"},
  {id:"sc5_ester5", type:"dialogue", speaker:"ESTER", text:"It was for all three receptors, though.", next:"sc5_jerry13"},
  {id:"sc5_jerry13", type:"dialogue", speaker:"JERRY", text:"Somewhere near one million then.", next:"sc5_ester6"},
  {id:"sc5_ester6", type:"dialogue", speaker:"ESTER", text:"Sorry, but I have to ask about our head — looking for funding for two months? Now that I think about it, I really haven’t seen him around. I think I surreptitiously made you the stand-in head, Jerry.", next:"sc5_jerry14"},
  {id:"sc5_jerry14", type:"dialogue", speaker:"JERRY", text:"I’m flattered. But I’m not, and Lamartine is really having some trouble.", next:"sc5_jerry15"},
  {id:"sc5_jerry15", type:"dialogue", speaker:"JERRY", text:"He’s going back and forth between the Intergalactic Scientific Association and the president of our own organization. Neither of them is budging very much for Nuclear, since we’re just kind of an add-on to engineering.", next:"sc5_judith6"},
  {id:"sc5_judith6", type:"dialogue", speaker:"JUDITH", text:"Jerry, focus. Noor’s still operating on your receptor. Give her some instructions. She has 15 minutes left up there!", next:"sc5_noor7"},
  {id:"sc5_noor7", type:"dialogue", speaker:"NOOR", text:"Don’t need that, Judith. I have most of it figured out myself.", next:"sc5_noor8"},
  {id:"sc5_noor8", type:"dialogue", speaker:"NOOR", text:"Right now the most I can really do is to give a full report of the damage. I’ve replaced a few rusty parts and re-oriented the device, in case that helps.", next:"sc5_jerry16"},
  {id:"sc5_jerry16", type:"dialogue", speaker:"JERRY", text:"Thanks. How bad is the damage?", next:"sc5_noor9"},
  {id:"sc5_noor9", type:"dialogue", speaker:"NOOR", text:"Um, since it got hit head-on, there’s a large segment a foot or so that’s kind of bent out of shape? The wiring underneath is tangled. Not sure if that was related to the collision.", next:"sc5_ester7"},
  {id:"sc5_ester7", type:"dialogue", speaker:"ESTER", text:"That should be fixable. Is nothing there missing?", next:"sc5_noor10"},
  {id:"sc5_noor10", type:"dialogue", speaker:"NOOR", text:"From what I see, nothing’s been severed!", next:"sc5_judith7"},
  {id:"sc5_judith7", type:"dialogue", speaker:"JUDITH", text:"Thirteen minutes.", next:"sc5_ester8"},
  {id:"sc5_ester8", type:"dialogue", speaker:"ESTER", text:"Judith, please — give us some space to think. Noor will get back within ten minutes.", next:"sc5_ester9"},
  {id:"sc5_ester9", type:"dialogue", speaker:"ESTER", text:"Noor, have you taken photos?", next:"sc5_noor11"},
  {id:"sc5_noor11", type:"dialogue", speaker:"NOOR", text:"Yes, I’ll send them to Engineering when I get back.", next:"sc5_ester10"},
  {id:"sc5_ester10", type:"dialogue", speaker:"ESTER", text:"That pod the Aerospace Engineering department made is mostly in operation. We have some operational robots we can take out to run tests with.", next:"sc5_ester11"},
  {id:"sc5_ester11", type:"dialogue", speaker:"ESTER", text:"We’ll need your help to design it; Bio too, if they want to.", next:"sc5_judith8"},
  {id:"sc5_judith8", type:"dialogue", speaker:"JUDITH", text:"Well. I mean, I can’t necessarily refuse.", next:"sc5_jerry17"},
  {id:"sc5_jerry17", type:"dialogue", speaker:"JERRY", text:"Ok, and if you don’t refuse, you will agree to send in Tadej and Kat.", next:"sc5_judith9"},
  {id:"sc5_judith9", type:"dialogue", speaker:"JUDITH", text:"Tadej and Katherine will do most of the negotiating. Remember, I’m still involved in a lot of the actual work, despite what you think of the quality of it.", next:"sc5_judith10"},
  {id:"sc5_judith10", type:"dialogue", speaker:"JUDITH", text:"Noor, are you on the way back yet?", next:"sc5_noor12"},
  {id:"sc5_noor12", type:"dialogue", speaker:"NOOR", text:"Yes. Will take roughly six minutes to make the return.", next:"sc5_judith11"},
  {id:"sc5_judith11", type:"dialogue", speaker:"JUDITH", text:"That’s good.", next:"sc5_ester12"},
  {id:"sc5_ester12", type:"dialogue", speaker:"ESTER", text:"Judith, if you’re going to be doing a lot of the work — as you yourself say it — I think it will be quite necessary for you to figure out negotiations too.", next:"sc5_ester13"},
  {id:"sc5_ester13", type:"dialogue", speaker:"ESTER", text:"The project will progress more quickly if you don’t have to have an intermediary bargain for every choice you want to go through with.", next:"sc5_ester14"},
  {id:"sc5_ester14", type:"dialogue", speaker:"ESTER", text:"And. . . it might be good if you and Jerry figured out how to have a civil conversation. Were you two like this as soon as you met each other?", next:"sc5_judith12"},
  {id:"sc5_judith12", type:"dialogue", speaker:"JUDITH", text:"No. I thought I’d get along with him.", next:"sc5_jerry18"},
  {id:"sc5_jerry18", type:"dialogue", speaker:"JERRY", text:"Yes, and we could have. Then she decided to snipe my project proposal in order to curry favor with her department chair.", next:"sc5_judith13"},
  {id:"sc5_judith13", type:"dialogue", speaker:"JUDITH", text:"I tried apologizing. I even tried to get you back some of it later!", next:"sc5_jerry19"},
  {id:"sc5_jerry19", type:"dialogue", speaker:"JERRY", text:"Yeah, about 25% of what we originally had. Why do you think that accident in Ester’s training session happened in the first place?", next:"sc5_judith14"},
  {id:"sc5_judith14", type:"dialogue", speaker:"JUDITH", text:"Isn’t it because you caught your sleeve on the—", next:"sc5_jerry20"},
  {id:"sc5_jerry20", type:"dialogue", speaker:"JERRY", text:"Yes, but devices like that don’t explode on impact! If we had gotten something from a vendor on I-239 who wasn’t pawning off random devices they’d gotten thirdhand, we’d have one more operating machine than we do right now—", next:"sc5_ester15"},
  {id:"sc5_ester15", type:"dialogue", speaker:"ESTER", text:"Stop it. Do Biology and Engineering hate each other or is it just you two dragging on this entire ordeal?", next:"sc5_judith15"},
  {id:"sc5_judith15", type:"dialogue", speaker:"JUDITH", text:"We still hate each other. Cause of funding.", next:"sc5_ester16"},
  {id:"sc5_ester16", type:"dialogue", speaker:"ESTER", text:"Then figure it out! There’s this project you have to collaborate on, at least two members of Biology don’t want us to be thrown out, and I think we’ll work at least semi-efficiently even if it’s just for this one thing!", next:"sc5_judith16"},
  {id:"sc5_judith16", type:"dialogue", speaker:"JUDITH", text:"I can try, I guess. But Jerry has to. And he has to forget about that stupid funding thing.", next:"sc5_judith17"},
  {id:"sc5_judith17", type:"dialogue", speaker:"JUDITH", text:"I was apologizing for a week straight.", next:"sc5_ester17"},
  {id:"sc5_ester17", type:"dialogue", speaker:"ESTER", text:"Not possible. Even if you were just a hotheaded rookie, just. . . agh, pretend you’ve never met each other. All of the departments are getting funding cuts. And we still have to borrow each other’s data and devices.", next:"sc5_judith18"},
  {id:"sc5_judith18", type:"dialogue", speaker:"JUDITH", text:"Fine.", next:"sc5_jerry21"},
  {id:"sc5_jerry21", type:"dialogue", speaker:"JERRY", text:"[Sighs] Ok, Ester. That’s reasonable.", next:"sc5_noor13"},
  {id:"sc5_noor13", type:"dialogue", speaker:"NOOR", text:"Guys. Anyone there? I’m back onboard.", next:"sc5_cameron5"},
  {id:"sc5_cameron5", type:"dialogue", speaker:"CAMERON", text:"I connected to that monitoring network while Jerry and Judith were arguing. Nice that you guys figured it out, but I’d really like to confirm all Noor’s vitals right now.", next:"sc5_noor14"},
  {id:"sc5_noor14", type:"dialogue", speaker:"NOOR", text:"Well?", next:"sc5_cameron6"},
  {id:"sc5_cameron6", type:"dialogue", speaker:"CAMERON", text:"All good. Go to the medical wing for the checkup as usual, then engineering and biology are having an impromptu meeting to go over everything.", next:"sc5_cameron7"},
  {id:"sc5_cameron7", type:"dialogue", speaker:"CAMERON", text:"Thanks Noor!", next:"sc5_noor15"},
  {id:"sc5_noor15", type:"dialogue", speaker:"NOOR", text:"As to you. I’m disconnecting now. . .", next:"sc5_cameron8"},
  {id:"sc5_cameron8", type:"dialogue", speaker:"CAMERON", text:"And you two. Jerry. Judith. Lamartine is going to be disappointed in you if you don’t get it together.", next:"sc5_cameron9"},
  {id:"sc5_cameron9", type:"dialogue", speaker:"CAMERON", text:"Good on you for mediating it, Ester. I’m drafting a formal proposal as soon as this call ends, and then I’m talking to the Bio head about this.", next:"sc5_cameron10"},
  {id:"sc5_cameron10", type:"dialogue", speaker:"CAMERON", text:"Disconnecting. Bye, Judith.", next:"sc5_recap"},
  {id:"sc5_recap", type:"recap", text:"The first interdepartmental research project in quite a long time is about to begin: you — the collected engineering departments — and Biology. You have successfully brokered a temporary peace, but will it stay long enough to complete the project?", next:"end"}
];

const REFLECTION_TEXT = "END OF SCENARIO";

/* ---- NODE MAP ---- */
const NODE_MAP = {};
SCENE_SCRIPT.forEach(n => { if(n.id) NODE_MAP[n.id] = n; });

/* ---- STATE ---- */
const S = {
  screen: "title",
  introIdx: 0,
  currentNode: null,
  typing: false,
  fullText: "",
  transitioning: false,
  settings: {dyslexia:true, textSpeed:"normal"},
  settingsOpen: false,
  instructionsOpen: false,
  // scene
  sceneScrollX: 0,
  idleBounce: 0,
  idlePaused: false,
  freeRoam: false,
  walkFrame: 0,
  playerX: 0,
  unlockedScene: 1, // highest scene number the player is allowed to start from the scene-select hub
  // anim
  starsOffset: 0,
  stationX: -50,
};

/* ---- DOM ---- */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ---- SCALING ---- */
function applyScale() {
  const g = $("#game");
  const w = window.innerWidth, h = window.innerHeight;
  const sx = Math.floor(w / 320), sy = Math.floor(h / 180);
  const scale = Math.max(1, Math.min(sx, sy));
  g.style.transform = "none";
  g.style.zoom = scale;
  g.style.width = "320px";
  g.style.height = "180px";
  const wrapper = $("#game-wrapper");
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  g.style.transformOrigin = "center center";
}
window.addEventListener("resize", applyScale);

/* ---- SCREEN MGR ---- */
function showScreen(name) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  $(`#screen-${name}`).classList.add("active");
  S.screen = name;
  $("#btn-pause").classList.toggle("hidden", name !== "intro" && name !== "scene" && name !== "scenes");
}

/* ---- TYPEWRITER ---- */
function charsPerSec() {
  if (S.settings.textSpeed === "instant") return 99999;
  return 40;
}

let typeTimer = null;
function typeText(el, text, cb) {
  clearTimeout(typeTimer);
  const cps = charsPerSec();
  if (cps >= 99999) { el.textContent = text; S.typing = false; if (cb) cb(); return; }
  S.typing = true;
  S.fullText = text;
  let i = 0;
  el.textContent = "";
  function tick() {
    i++;
    el.textContent = text.substring(0, i);
    if (i >= text.length) { S.typing = false; if (cb) cb(); return; }
    typeTimer = setTimeout(tick, 1000 / cps);
  }
  tick();
}

function completeType(el) {
  clearTimeout(typeTimer);
  el.textContent = S.fullText;
  S.typing = false;
}

/* ---- TITLE SCREEN ---- */
function initTitle() {
  $("#btn-start").addEventListener("click", e => { e.stopPropagation(); startIntro(); });
  setTimeout(() => {
    $("#title-text").classList.add("visible");
  }, 100);
}

/* ---- TITLE ANIMATION LOOP ---- */
let lastTime = 0;

function titleLoop(ts) {
  if (S.screen !== "title") return;
  const dt = Math.min(ts - lastTime, 50);
  lastTime = ts;

  S.starsOffset -= 4 * dt / 1000;
  $(".title-stars").style.backgroundPosition = `${S.starsOffset}px 0`;

  S.stationX += 10 * dt / 1000;
  if (S.stationX > 340) S.stationX = -50;
  $("#title-station").style.left = S.stationX + "px";

  requestAnimationFrame(titleLoop);
}

/* ---- INTRO ---- */
function startIntro() {
  S.introIdx = 0;
  showScreen("intro");
  showIntroCard();
}

function showIntroCard() {
  const el = $("#intro-text");
  $("#intro-counter").textContent = `${S.introIdx + 1}/${INTRO_CARDS.length}`;
  typeText(el, INTRO_CARDS[S.introIdx]);
}

function advanceIntro() {
  const el = $("#intro-text");
  if (S.typing) { completeType(el); return; }
  S.introIdx++;
  if (S.introIdx >= INTRO_CARDS.length) {
    S.unlockedScene = 1;
    showSceneSelect();
  } else {
    showIntroCard();
  }
}

/* ---- SCENE ---- */
let sceneIdleBounceTimer = 0;
let walkAnimTimer = 0;

// Free-roam bounds within the lab. World x 0–320 is the aerospace-engineering
// placeholder area added for Scene 4, west of the lab; everything lab-related
// below is shifted +320 to make room for it.
const VIEWPORT_WIDTH = 320;
const WORLD_WIDTH = 960;
const CAM_MAX_SCROLL = WORLD_WIDTH - VIEWPORT_WIDTH;
const LAB_MIN_X = 332;
const LAB_MAX_X = 720;
const SAM_LAB_X = 700; // Sam waits further into the lab, out of the starting frame
const PLAYER_START_X = 350;
const PROXIMITY_DIST = 45; // how close Ester must get to a target to trigger the next node
const PLAYER_MOVE_SPEED = 60; // px/sec
const JERRY_ENTER_X = SAM_LAB_X + 140; // where Jerry starts, further down the room
const JERRY_JOIN_X = SAM_LAB_X + 40; // where Jerry ends up, beside Sam and Ester
const JERRY_WALK_MS = 1300;
const WALK_FRAME_MS = 130; // ms per leg-cycle frame while Ester is moving
const moveKeys = { left: false, right: false };

// Generic free-roam config — which bounds/target/next-node the current
// walk segment uses. Defaults match the Scene 1 walk to Sam; other scenes
// override these via startFreeRoam() before setting S.freeRoam = true.
let freeRoamMinX = LAB_MIN_X, freeRoamMaxX = LAB_MAX_X, freeRoamTargetX = SAM_LAB_X, freeRoamNextNode = "s1";

function startFreeRoam(startX, minX, maxX, targetX, nextNode, facingRight) {
  // startX/facingRight are optional — omit them to have Ester continue
  // walking from wherever she currently stands and however she's already
  // facing, instead of snapping to a fixed spot/direction.
  if (startX != null) S.playerX = startX;
  freeRoamMinX = minX;
  freeRoamMaxX = maxX;
  freeRoamTargetX = targetX;
  freeRoamNextNode = nextNode;
  S.freeRoam = true;
  S.sceneScrollX = Math.max(0, Math.min(CAM_MAX_SCROLL, S.playerX - VIEWPORT_WIDTH / 2));
  $("#scene-world").style.left = -S.sceneScrollX + "px";
  $("#scene-sprite-ester").style.left = S.playerX + "px";
  if (facingRight != null) $("#scene-sprite-ester").classList.toggle("facing-left", !facingRight); // art faces right natively
  walkAnimTimer = 0;
  S.walkFrame = 0;
  moveKeys.left = false;
  moveKeys.right = false;
}

function startScene() {
  showScreen("scene");

  // Opening: camera follows Ester from the left edge of the lab. Sam
  // waits further in, out of frame, until she walks over to him.
  startFreeRoam(PLAYER_START_X, LAB_MIN_X, LAB_MAX_X, SAM_LAB_X, "s1", true);
  $("#scene-sprite-sam").style.left = SAM_LAB_X + "px";
  $("#scene-sprite-jerry").classList.add("hidden");

  sceneIdleBounceTimer = 0;
  sceneAnimTs = performance.now();
  requestAnimationFrame(sceneAnimLoop);
}

let jerryWalkInterval = null;

function jerryEnter(nextNodeId) {
  // Jerry walks into frame and joins Sam and Ester, rather than the
  // camera cutting to him. The dialogue box is hidden for this beat —
  // it otherwise covers the whole sprite layer, which would make the
  // walk-in invisible — and reappears with pb1 once he arrives.
  const jerry = $("#scene-sprite-jerry");
  S.transitioning = true;
  $("#dialogue-row").classList.add("hidden");
  jerry.classList.remove("walking");
  jerry.style.left = JERRY_ENTER_X + "px";
  jerry.style.backgroundPosition = "0 0";
  jerry.classList.toggle("facing-left", JERRY_JOIN_X < JERRY_ENTER_X); // art faces right natively
  jerry.classList.remove("hidden");

  const arrive = () => {
    clearInterval(jerryWalkInterval);
    jerryWalkInterval = null;
    jerry.style.backgroundPosition = "0 0";
    S.transitioning = false;
    runNode(nextNodeId);
  };

  void jerry.offsetWidth; // flush the start position before transitioning
  jerry.classList.add("walking");
  jerry.style.left = JERRY_JOIN_X + "px";
  let jerryWalkFrame = 0;
  jerryWalkInterval = setInterval(() => {
    jerryWalkFrame = (jerryWalkFrame + 1) % 4;
    jerry.style.backgroundPosition = `-${jerryWalkFrame * 36}px 0`;
  }, WALK_FRAME_MS);
  setTimeout(() => {
    jerry.classList.remove("walking");
    arrive();
  }, JERRY_WALK_MS);
}

function sensoryMinigameMessage(e) {
  if (!e.data || e.data.source !== "sensory-minigame" || e.data.type !== "complete") return;
  window.removeEventListener("message", sensoryMinigameMessage);
  $("#minigame-frame").blur();
  window.focus();
  showScreen("scene");
  sceneAnimTs = performance.now();
  requestAnimationFrame(sceneAnimLoop);
  S.transitioning = false;
  runNode(sensoryMinigameNext);
}

let sensoryMinigameNext = null;

function startSensoryMinigame(nextNodeId) {
  // The mercury-cleanup beat hands off to the standalone sensory-overload
  // minigame (its own document/globals, loaded in an iframe so it can't
  // collide with this page's own `S`/`$`). It posts a "complete" message
  // back via postMessage when the player finishes, which resumes the script.
  S.transitioning = true;
  sensoryMinigameNext = nextNodeId;
  $("#dialogue-row").classList.add("hidden");
  const frame = $("#minigame-frame");
  const dyslexia = S.settings.dyslexia ? "1" : "0";
  frame.src = "./sensory-minigame.html?t=" + Date.now() + "&dyslexia=" + dyslexia; // force a fresh load every time
  showScreen("minigame");
  window.removeEventListener("message", sensoryMinigameMessage);
  window.addEventListener("message", sensoryMinigameMessage);
  frame.addEventListener("load", () => frame.contentWindow.focus(), { once: true });
}

let sceneAnimTs = 0;
function sceneAnimLoop(ts) {
  if (S.screen !== "scene") return;
  const dt = ts - sceneAnimTs;
  sceneAnimTs = ts;

  if (S.freeRoam && !S.settingsOpen && !S.instructionsOpen) {
    let dx = 0;
    if (moveKeys.left) dx -= 1;
    if (moveKeys.right) dx += 1;
    if (dx !== 0) {
      S.playerX = Math.max(freeRoamMinX, Math.min(freeRoamMaxX, S.playerX + dx * PLAYER_MOVE_SPEED * dt / 1000));
      $("#scene-sprite-ester").style.left = S.playerX + "px";
      $("#scene-sprite-ester").classList.toggle("facing-left", dx < 0); // art faces right natively
      S.sceneScrollX = Math.max(0, Math.min(CAM_MAX_SCROLL, S.playerX - VIEWPORT_WIDTH / 2));
      $("#scene-world").style.left = -S.sceneScrollX + "px";

      walkAnimTimer += dt;
      while (walkAnimTimer >= WALK_FRAME_MS) {
        walkAnimTimer -= WALK_FRAME_MS;
        S.walkFrame = (S.walkFrame + 1) % 4;
      }
      $("#scene-sprite-ester").style.backgroundPosition = `-${S.walkFrame * 36}px 0`;
    } else if (S.walkFrame !== 0) {
      S.walkFrame = 0;
      walkAnimTimer = 0;
      $("#scene-sprite-ester").style.backgroundPosition = "0 0";
    }
    if (Math.abs(S.playerX - freeRoamTargetX) <= PROXIMITY_DIST) {
      S.freeRoam = false;
      moveKeys.left = false;
      moveKeys.right = false;
      S.walkFrame = 0;
      walkAnimTimer = 0;
      $("#scene-sprite-ester").style.backgroundPosition = "0 0";
      runNode(freeRoamNextNode);
    }
  }

  if (!S.idlePaused) {
    sceneIdleBounceTimer += dt;
    if (sceneIdleBounceTimer >= 520) {
      sceneIdleBounceTimer -= 520;
      S.idleBounce = 1 - S.idleBounce;
      const frameX = S.idleBounce * 24;
      $$(".scene-sprite").forEach(sp => {
        if (sp.dataset.char === "ester" || sp.dataset.char === "sam" || sp.dataset.char === "jerry") return;
        if (sp.classList.contains("hidden")) return;
        sp.style.backgroundPosition = `-${frameX}px 0`;
      });
      // Bounce the dialogue portrait (if it's an NPC, not Ester, Sam, or Jerry)
      const portrait = $("#dialogue-portrait");
      if (!portrait.classList.contains("hidden") && !portrait.classList.contains("char-ester") && !portrait.classList.contains("char-sam") && !portrait.classList.contains("char-jerry")) {
        portrait.style.backgroundPosition = `-${frameX}px 0`;
      }
    }
  }

  requestAnimationFrame(sceneAnimLoop);
}

function runNode(nodeId) {
  const node = NODE_MAP[nodeId];
  if (!node) { showEnd(); return; }
  S.currentNode = node;

  if (node.showSprites) {
    $("#scene-sprite-sam").classList.toggle("hidden", !node.showSprites.includes("sam"));
    $("#scene-sprite-jerry").classList.toggle("hidden", !node.showSprites.includes("jerry"));
    $("#scene-sprite-ester").classList.toggle("hidden", !node.showSprites.includes("ester"));
  }

  // Reveals background elements that are hidden by default (e.g. placeholder
  // rooms for areas without art yet), so they can't peek into view via the
  // camera before the story actually reaches them.
  if (node.reveal) node.reveal.forEach(id => $("#" + id).classList.remove("hidden"));

  // Snaps a sprite to a world-space x position for scene cuts, e.g. a
  // character appearing somewhere new off-screen rather than walking in.
  if (node.positions) Object.entries(node.positions).forEach(([charName, x]) => {
    $("#scene-sprite-" + charName).style.left = x + "px";
  });

  if (node.type === "control") {
    if (node.action === "jerry_enter") { jerryEnter(node.next); return; }
    if (node.action === "sensory_minigame") { startSensoryMinigame(node.next); return; }
    if (node.action === "free_roam") { startFreeRoam(node.startX, node.minX, node.maxX, node.targetX, node.next, node.facingRight); return; }
  }

  // Choices
  if (node.type === "choice") { showChoicePanel(node.choices); return; }

  // Scene-ending recap beats — presented like the intro cards, full-screen and on their own
  if (node.type === "recap") { runRecapNode(node); return; }

  S.idlePaused = node.type === "inner";

  const row = $("#dialogue-row");
  row.classList.remove("hidden");

  // Dialogue / inner / narration
  const box = $("#dialogue-box");
  box.classList.remove("type-dialogue", "type-inner", "type-narration");
  box.classList.add(`type-${node.type}`);

  const portrait = $("#dialogue-portrait");
  portrait.className = "";
  portrait.style.backgroundPosition = "0 0";
  if (node.type === "dialogue" && node.speaker) {
    const charName = node.speaker.toLowerCase();
    portrait.classList.add("char-" + charName);
    portrait.classList.remove("hidden");
  } else {
    portrait.classList.add("hidden");
  }

  const speakerEl = $("#dialogue-speaker");
  if (node.type === "dialogue" && node.speaker) {
    speakerEl.textContent = node.speaker;
    speakerEl.style.display = "";
  } else {
    speakerEl.textContent = "";
    speakerEl.style.display = "none";
  }

  fitDialogueBoxToText(node.text);
  typeText($("#dialogue-text"), node.text);
}

/* Size the box to this line's full text before the typewriter starts,
   so it snaps to the right height once per line instead of growing/
   jumping line-by-line as characters are revealed. */
function fitDialogueBoxToText(text) {
  const box = $("#dialogue-box");
  const textEl = $("#dialogue-text");
  const prevText = textEl.textContent;

  box.style.height = "auto";
  textEl.textContent = text;
  box.style.height = box.scrollHeight + "px";
  textEl.textContent = prevText;
}

function advanceScene() {
  if (S.transitioning) return;
  const node = S.currentNode;
  if (!node) return;
  if (S.typing) { completeType($("#dialogue-text")); return; }
  if (node.next) {
    runNode(node.next);
  } else {
    showEnd();
  }
}

/* ---- SCENE SELECT ---- */
// Puts characters at their correct starting spot for a scene entered from
// the hub, rather than relying on wherever they happened to be left.
function resetSceneStage({ sam, jerry, ester, cameraX }) {
  S.freeRoam = false;
  moveKeys.left = false;
  moveKeys.right = false;
  S.walkFrame = 0;
  walkAnimTimer = 0;
  sceneIdleBounceTimer = 0;
  S.sceneScrollX = Math.max(0, Math.min(CAM_MAX_SCROLL, cameraX - VIEWPORT_WIDTH / 2));
  $("#scene-world").style.left = -S.sceneScrollX + "px";
  if (sam) {
    $("#scene-sprite-sam").style.left = sam.x + "px";
    $("#scene-sprite-sam").classList.toggle("facing-left", !!sam.facingLeft);
  }
  if (jerry) {
    $("#scene-sprite-jerry").style.left = jerry.x + "px";
    $("#scene-sprite-jerry").classList.toggle("facing-left", !!jerry.facingLeft);
  }
  if (ester) {
    S.playerX = ester.x;
    $("#scene-sprite-ester").style.left = ester.x + "px";
    $("#scene-sprite-ester").classList.toggle("facing-left", !!ester.facingLeft);
  }
}

// Each playable scene's entry node and a start() that stages the scene
// (camera + character positions) before running that node. Scene 1 handles
// its own staging via startScene(), since it opens on a free-roam walk
// rather than a fixed starting pose.
const SCENES = [
  { num:1, entry:"s1", start() { startScene(); } },
  { num:2, entry:"sc2_open_inner", start() {
    showScreen("scene");
    resetSceneStage({ sam:{x:SAM_LAB_X}, jerry:{x:JERRY_JOIN_X}, ester:{x:SAM_LAB_X - 30}, cameraX:SAM_LAB_X });
    sceneAnimTs = performance.now();
    requestAnimationFrame(sceneAnimLoop);
    runNode("sc2_open_inner");
  }},
  { num:3, entry:"sc3_open", start() {
    showScreen("scene");
    resetSceneStage({ ester:{x:SAM_LAB_X - 30}, cameraX:SAM_LAB_X });
    sceneAnimTs = performance.now();
    requestAnimationFrame(sceneAnimLoop);
    runNode("sc3_open");
  }},
  { num:4, entry:"sc4_open_inner1", start() {
    showScreen("scene");
    resetSceneStage({ jerry:{x:SAM_LAB_X - 30}, ester:{x:SAM_LAB_X - 60}, cameraX:SAM_LAB_X });
    sceneAnimTs = performance.now();
    requestAnimationFrame(sceneAnimLoop);
    runNode("sc4_open_inner1");
  }},
  { num:5, entry:"sc5_open", start() {
    showScreen("scene");
    resetSceneStage({ cameraX:160 }); // nobody's on screen yet — sc5_cut_aerospace places Ester/Jerry itself
    sceneAnimTs = performance.now();
    requestAnimationFrame(sceneAnimLoop);
    runNode("sc5_open");
  }},
];

const ENTRY_TO_SCENE_NUM = {};
SCENES.forEach(s => { ENTRY_TO_SCENE_NUM[s.entry] = s.num; });

function showSceneSelect() {
  showScreen("scenes");
  const list = $("#scenes-list");
  list.innerHTML = "";
  SCENES.forEach(s => {
    const btn = document.createElement("button");
    btn.className = "btn btn-purple scene-btn";
    btn.textContent = "SCENE " + s.num;
    if (s.num < S.unlockedScene) {
      btn.classList.add("completed");
      btn.disabled = true;
    } else if (s.num === S.unlockedScene) {
      btn.addEventListener("click", () => s.start());
    } else {
      btn.classList.add("locked");
      btn.disabled = true;
    }
    list.appendChild(btn);
  });
}

/* ---- RECAP (scene-ending summary beats, styled like the intro cards) ---- */
function runRecapNode(node) {
  S.idlePaused = true;
  $("#dialogue-row").classList.add("hidden");
  showScreen("recap");
  typeText($("#recap-text"), node.text);
}

function advanceRecap() {
  const el = $("#recap-text");
  if (S.typing) { completeType(el); return; }
  const node = S.currentNode;
  const nextSceneNum = ENTRY_TO_SCENE_NUM[node.next];
  if (nextSceneNum) {
    // Recap ends a scene and leads into the next one — route through the
    // hub instead of continuing straight in, unlocking that scene there.
    S.unlockedScene = Math.max(S.unlockedScene, nextSceneNum);
    showSceneSelect();
  } else if (node.next) {
    showScreen("scene");
    sceneAnimTs = performance.now();
    requestAnimationFrame(sceneAnimLoop);
    runNode(node.next);
  } else {
    showEnd();
  }
}

/* ---- CHOICES ---- */
function showChoicePanel(choices) {
  const panel = $("#choice-panel");
  $("#dialogue-row").classList.add("hidden");
  panel.innerHTML = "";
  panel.classList.remove("hidden");

  choices.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "btn btn-purple choice-btn";
    btn.innerHTML = `<span>${c.label}</span>`;
    btn.tabIndex = -1;
    btn.addEventListener("click", () => {
      panel.classList.add("hidden");
      runNode(c.next);
    });
    panel.appendChild(btn);
  });
}

/* ---- END SCREEN ---- */
function showEnd() {
  if (S.screen === "end") return;
  showScreen("end");
  $("#dialogue-row").classList.add("hidden");
  S.idlePaused = false;

  setTimeout(() => {
    const ref = $("#end-reflection");
    ref.textContent = REFLECTION_TEXT;
    ref.classList.remove("hidden");
    ref.classList.add("visible");
    $("#end-buttons").classList.remove("hidden");
  }, 300);
}

/* ---- RESTART ---- */
function initRestart() {
  $("#btn-restart").addEventListener("click", () => {
    S.introIdx = 0;
    S.currentNode = null;
    S.typing = false;
    S.starsOffset = 0;
    S.stationX = -50;
    S.idlePaused = false;
    S.unlockedScene = 1;
    $("#choice-panel").classList.add("hidden");
    $("#dialogue-row").classList.add("hidden");
    $("#end-reflection").classList.remove("visible");
    $("#end-reflection").classList.add("hidden");
    $("#end-buttons").classList.add("hidden");
    showScreen("title");
    lastTime = performance.now();
    requestAnimationFrame(titleLoop);
  });
}

/* ---- GLOBAL INPUT ---- */
function initInput() {
  document.addEventListener("click", e => {
    if (S.settingsOpen || S.instructionsOpen) return;
    if (S.screen === "intro") advanceIntro();
    if (S.screen === "recap") advanceRecap();
  });
  document.addEventListener("keydown", e => {
    if (S.settingsOpen || S.instructionsOpen) {
      if (e.key === "Escape") { closeSettings(); closeInstructions(); }
      return;
    }
    if (S.screen === "intro" && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      advanceIntro();
    }
    if (S.screen === "recap" && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      advanceRecap();
    }
    if (S.screen === "scene" && S.freeRoam) {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") { moveKeys.left = true; e.preventDefault(); }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") { moveKeys.right = true; e.preventDefault(); }
    }
    if (S.screen === "scene" && !S.freeRoam && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      if (!$("#choice-panel").classList.contains("hidden")) return; // choices are mouse-only
      advanceScene();
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") moveKeys.left = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") moveKeys.right = false;
  });
  $("#dialogue-row").addEventListener("click", () => {
    if (S.settingsOpen || S.instructionsOpen) return;
    if (S.screen === "scene") advanceScene();
  });
}

/* ---- SETTINGS ---- */
const SETTINGS_STORAGE_KEY = "eventHorizonSettings";

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) Object.assign(S.settings, JSON.parse(raw));
  } catch (e) { /* localStorage unavailable — fall back to defaults */ }
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(S.settings));
  } catch (e) { /* localStorage unavailable — settings won't persist */ }
}

function applySettingsToDOM() {
  document.body.classList.toggle("dyslexia-font", S.settings.dyslexia);
  $("#chk-dyslexia").checked = S.settings.dyslexia;
  $("#chk-instant-text").checked = S.settings.textSpeed === "instant";
}

function openSettings() {
  S.settingsOpen = true;
  $("#settings-overlay").classList.remove("hidden");
}

function closeSettings() {
  S.settingsOpen = false;
  $("#settings-overlay").classList.add("hidden");
}

function openInstructions() {
  closeSettings(); // instructions can be opened from inside the settings panel — don't stack both overlays
  S.instructionsOpen = true;
  $("#instructions-overlay").classList.remove("hidden");
}

function closeInstructions() {
  S.instructionsOpen = false;
  $("#instructions-overlay").classList.add("hidden");
}

function initSettings() {
  loadSettings();
  applySettingsToDOM();

  $("#btn-settings").addEventListener("click", openSettings);
  $("#btn-pause").addEventListener("click", openSettings);
  $("#btn-settings-close").addEventListener("click", closeSettings);
  $("#btn-instructions").addEventListener("click", openInstructions);
  $("#btn-settings-instructions").addEventListener("click", openInstructions);
  $("#btn-instructions-close").addEventListener("click", closeInstructions);

  $("#chk-dyslexia").addEventListener("change", e => {
    S.settings.dyslexia = e.target.checked;
    document.body.classList.toggle("dyslexia-font", S.settings.dyslexia);
    saveSettings();
  });

  $("#chk-instant-text").addEventListener("change", e => {
    S.settings.textSpeed = e.target.checked ? "instant" : "normal";
    saveSettings();
  });
}

/* ---- INIT ---- */
function init() {
  applyScale();
  initTitle();
  initRestart();
  initInput();
  initSettings();

  lastTime = performance.now();
  requestAnimationFrame(titleLoop);
}

document.addEventListener("DOMContentLoaded", init);
