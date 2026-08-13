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
  {id:"sc3_case_recap", type:"recap", text:"Jerry and the biology department now respect your knowledge and tenacity.", next:"end"},

  /* -- Choice 2: gesture to Jerry -- */
  {id:"sc3_gesture_1", type:"inner", text:"No clue what to do with all this. At least I had managed, for a little bit. I waved frantically at Jerry — on the other side of the room, fiddling with his telemetry devices and cursing under his breath. His eyes went wide, and he immediately abandoned it to take the phone out of my hand.", next:"sc3_gesture_2", showSprites:["jerry","ester"]},
  {id:"sc3_gesture_2", type:"dialogue", speaker:"JERRY", text:"Judith! You’ve barely even met Ester, the hell are you yelling at her for? All we are asking for is just a little bit of your precious, precious data, and machines to see if our astronaut is still freaking breathing or not… What do you mean we don’t deserve to get the telemetry systems fixed? I’m going to—", next:"sc3_gesture_3"},
  {id:"sc3_gesture_3", type:"inner", text:"He said a number of things I’ve never heard used in such a . . . creative manner before.", next:"sc3_gesture_4"},
  {id:"sc3_gesture_4", type:"narration", text:"They went back and forth like that for a while, each end defending their department’s honor like it was the last line of appeal from being flung into the black hole itself. It ended with Jerry slamming the receiver down. He put his head in his hands, sighed deeply, and then teetered toward the door.", next:"sc3_gesture_5"},
  {id:"sc3_gesture_5", type:"dialogue", speaker:"JERRY", text:"Sorry you had to hear that. Fix up the rest of the measurements, please — I’m going to find Tadej. I swear, I can get absolutely nowhere with those idiots in Bio without him in the room to mediate…", next:"sc3_gesture_recap"},
  {id:"sc3_gesture_recap", type:"recap", text:"Jerry fully accepted you into the “nuclear” team in your grand struggles against technology, governance, and the other departments — though you still have to steer clear of Biology.", next:"end"}
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
  // scene
  sceneScrollX: 0,
  idleBounce: 0,
  idlePaused: false,
  freeRoam: false,
  walkFrame: 0,
  playerX: 0,
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
  $("#btn-pause").classList.toggle("hidden", name !== "intro" && name !== "scene");
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
  $("#btn-dev-scene3").addEventListener("click", e => { e.stopPropagation(); devJumpToScene3(); }); // TEMP DEV — remove before shipping
  setTimeout(() => {
    $("#title-text").classList.add("visible");
  }, 100);
}

// TEMP DEV — jumps straight into Scene 3 for testing, skipping the intro and Scenes 1–2. Remove before shipping.
function devJumpToScene3() {
  showScreen("scene");
  S.freeRoam = false;
  moveKeys.left = false;
  moveKeys.right = false;
  S.sceneScrollX = 0;
  $("#scene-world").style.left = "0px";
  $("#scene-sprite-sam").style.left = SAM_LAB_X + "px";
  $("#scene-sprite-ester").style.left = "150px";
  $("#scene-sprite-ester").classList.remove("facing-left");
  $("#scene-sprite-jerry").style.left = "190px";
  $("#scene-sprite-jerry").classList.remove("facing-left");
  sceneIdleBounceTimer = 0;
  walkAnimTimer = 0;
  S.walkFrame = 0;
  sceneAnimTs = performance.now();
  requestAnimationFrame(sceneAnimLoop);
  runNode("sc3_open");
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
    startScene();
  } else {
    showIntroCard();
  }
}

/* ---- SCENE ---- */
let sceneIdleBounceTimer = 0;
let walkAnimTimer = 0;

// Free-roam bounds within the lab.
const VIEWPORT_WIDTH = 320;
const WORLD_WIDTH = 640;
const CAM_MAX_SCROLL = WORLD_WIDTH - VIEWPORT_WIDTH;
const LAB_MIN_X = 12;
const LAB_MAX_X = 400;
const SAM_LAB_X = 380; // Sam waits further into the lab, out of the starting frame
const PLAYER_START_X = 30;
const PROXIMITY_DIST = 45; // how close Ester must get to Sam to start s1
const PLAYER_MOVE_SPEED = 60; // px/sec
const JERRY_ENTER_X = SAM_LAB_X + 140; // where Jerry starts, further down the room
const JERRY_JOIN_X = SAM_LAB_X + 40; // where Jerry ends up, beside Sam and Ester
const JERRY_WALK_MS = 1300;
const WALK_FRAME_MS = 130; // ms per leg-cycle frame while Ester is moving
const moveKeys = { left: false, right: false };

function startScene() {
  showScreen("scene");

  // Opening: camera follows Ester from the left edge of the lab. Sam
  // waits further in, out of frame, until she walks over to him.
  S.playerX = PLAYER_START_X;
  S.sceneScrollX = Math.max(0, Math.min(CAM_MAX_SCROLL, S.playerX - VIEWPORT_WIDTH / 2));
  S.freeRoam = true;
  $("#scene-sprite-sam").style.left = SAM_LAB_X + "px";
  $("#scene-sprite-ester").style.left = S.playerX + "px";
  $("#scene-sprite-ester").classList.remove("facing-left"); // she starts walking right, toward Sam
  $("#scene-sprite-jerry").classList.add("hidden");
  $("#scene-world").style.left = -S.sceneScrollX + "px";

  sceneIdleBounceTimer = 0;
  walkAnimTimer = 0;
  S.walkFrame = 0;
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

  if (S.freeRoam && !S.settingsOpen) {
    let dx = 0;
    if (moveKeys.left) dx -= 1;
    if (moveKeys.right) dx += 1;
    if (dx !== 0) {
      S.playerX = Math.max(LAB_MIN_X, Math.min(LAB_MAX_X, S.playerX + dx * PLAYER_MOVE_SPEED * dt / 1000));
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
    if (Math.abs(S.playerX - SAM_LAB_X) <= PROXIMITY_DIST) {
      S.freeRoam = false;
      moveKeys.left = false;
      moveKeys.right = false;
      S.walkFrame = 0;
      walkAnimTimer = 0;
      $("#scene-sprite-ester").style.backgroundPosition = "0 0";
      runNode("s1");
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

  if (node.type === "control") {
    if (node.action === "jerry_enter") { jerryEnter(node.next); return; }
    if (node.action === "sensory_minigame") { startSensoryMinigame(node.next); return; }
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
  if (node.next) {
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
    if (S.settingsOpen) return;
    if (S.screen === "intro") advanceIntro();
    if (S.screen === "recap") advanceRecap();
  });
  document.addEventListener("keydown", e => {
    if (S.settingsOpen) {
      if (e.key === "Escape") closeSettings();
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
    if (S.settingsOpen) return;
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

function initSettings() {
  loadSettings();
  applySettingsToDOM();

  $("#btn-settings").addEventListener("click", openSettings);
  $("#btn-pause").addEventListener("click", openSettings);
  $("#btn-settings-close").addEventListener("click", closeSettings);

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
