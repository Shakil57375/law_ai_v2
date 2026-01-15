export const solutionsData = {
  TranscriptX: {
    intro1: {
      tabLabel: "Example 1",
      title: "Experience TranscriptX - Effortless, Accurate Medical Transcription",
      before: {
        title: "Doctor's Dictation",
        subtitle: "Audio Input",
        contentTitle: "Doctor's Dictation (Audio Input Simulation)",
        content: [
          {
            type: "paragraph",
            content:
              "\"Okay, uh, patient is Sarah Chen, DOB 3/22/1978. Seen today, October 26th, 2023. Chief complaint... uh... right knee pain, ongoing for about 3 months, worse with activity, especially stairs. Subjective: Patient describes the pain as a dull ache, located medially. Rates it a 6/10 currently, can go up to 8/10 after exercise. Some morning stiffness, lasts maybe 15 minutes. No significant swelling reported, denies locking or giving way. Uh... tried over-the-counter Ibuprofen with some partial relief. No history of trauma. Otherwise healthy. Objective: Gait is non-antalgic. Right knee exam: No effusion visible. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially. Assessment: Likely medial compartment osteoarthritis of the right knee. Differential includes medial meniscus tear, although less likely given exam findings. Plan: Uh... Obtain bilateral weight-bearing knee X-rays. Recommend continued NSAID use as needed, consider switching to Naproxen. Discussed physical therapy options for strengthening quadriceps and hamstrings. Also discussed... lifestyle modifications, weight management if applicable... oh, patient's BMI is 24, so that's fine. Follow up in 4 weeks with X-ray results to discuss further management, possibly including corticosteroid injection or referral to orthopedics if symptoms persist. End dictation.\"",
          },
        ],
      },
      after: {
        title: "TranscriptX Note",
        subtitle: "AI-Generated Output",
        contentTitle: "TranscriptX - AI-Generated Note",
        content: [
          { type: "paragraph", content: "Patient: Sarah Chen" },
          { type: "paragraph", content: "DOB: 03/22/1978" },
          { type: "paragraph", content: "Date of Service: October 26, 2023" },
          { type: "heading", level: 3, content: "Chief Complaint:" },
          { type: "paragraph", content: "Right knee pain x 3 months." },
          { type: "heading", level: 3, content: "Subjective:" },
          {
            type: "paragraph",
            content:
              "Patient reports right knee pain ongoing for approximately 3 months, described as a dull ache located medially. Pain worsens with activity, particularly stair climbing. Pain rated 6/10 currently, increasing to 8/10 post-exercise. Reports approximately 15 minutes of morning stiffness. Denies significant swelling, locking, or episodes of giving way. Partial relief noted with over-the-counter Ibuprofen. No history of trauma. Patient is otherwise healthy.",
          },
          { type: "heading", level: 3, content: "Objective:" },
          { type: "paragraph", content: "Gait: Non-antalgic." },
          {
            type: "paragraph",
            content:
              "Right Knee Exam: No visible effusion. Mild tenderness to palpation over the medial joint line. Full range of motion; terminal flexion elicits mild medial discomfort. McMurray's test negative. Lachman test negative. Anterior/Posterior Drawer tests negative (knee stable).",
          },
          { type: "paragraph", content: "BMI: 24" },
          { type: "heading", level: 3, content: "Assessment:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Medial compartment osteoarthritis, right knee (probable).",
              "Rule out medial meniscus tear (less likely).",
            ],
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Order bilateral weight-bearing knee X-rays (AP, lateral, sunrise views).",
              "Recommend continued PRN NSAID use (consider trial of Naproxen 500mg BID PRN).",
              "Discussed referral for Physical Therapy focusing on quadriceps/hamstring strengthening.",
              "Discussed lifestyle modifications.",
              "Follow up in 4 weeks to review X-ray results and clinical progress. Consider intra-articular corticosteroid injection or orthopedic referral if symptoms persist or worsen.",
            ],
          },
        ],
      },
    },
    intro2: {
      tabLabel: "Example 2",
      title: "Experience TranscriptX - Accurate Nursing Notes",
      before: {
        title: "Nurse's Quick Report",
        subtitle: "Simulated Verbal/Notes",
        contentTitle: "Nurse's Quick Report (Simulated Verbal Input/Jotted Notes)",
        content: [
          {
            type: "paragraph",
            content:
              '"Alright, handover for Bed 7, uh, Mrs. Gable, 72F, brought in by EMS, syncopal episode at home. Witnessed by husband, slumped in chair, maybe 30 seconds LOC? GCS 15 on arrival. Hx of HTN, Afib on Eliquis. Vitals: BP 105/60, HR 115 irreg, RR 20, SpO2 94% RA, Temp 37.1. Put her on the monitor, she\'s in Afib RVR. Got an 18g IV L AC, labs drawn - CBC, CMP, Trop, Coags sent stat. EKG done, showed Afib RVR, no acute ST changes noted. Portable chest X-ray ordered. Gave a 500cc NS bolus, BP now 115/65, HR down to 105. Still awake, alert, denies CP, SOB. Neuro checks grossly normal. Waiting on lab results and CXR read. Dr. Evans aware, considering diltiazem drip maybe? Keep a close eye on her pressure and rhythm."',
          },
        ],
      },
      after: {
        title: "TranscriptX Note",
        subtitle: "AI-Structured Nursing Note/Handover",
        contentTitle: "TranscriptX - AI-Structured Nursing Note/Handover",
        content: [
          { type: "paragraph", content: "Patient: Gable, [First Name Redacted]" },
          { type: "paragraph", content: "Age/Sex: 72-year-old Female (72F)" },
          { type: "paragraph", content: "Location: ED Bed 7" },
          { type: "paragraph", content: "Arrival: Via EMS" },
          { type: "heading", level: 3, content: "Presenting Complaint:" },
          { type: "paragraph", content: "Syncopal episode at home." },
          { type: "heading", level: 3, content: "History:" },
          {
            type: "paragraph",
            content:
              "Witnessed syncopal episode (approx. 30 seconds loss of consciousness) reported by husband. Past Medical History (PMH) significant for Hypertension (HTN) and Atrial Fibrillation (Afib), prescribed Eliquis.",
          },
          { type: "heading", level: 3, content: "Initial Assessment (On Arrival):" },
          {
            type: "paragraph",
            content:
              "Neurological: Glasgow Coma Scale (GCS) 15. Awake, alert, oriented. Denies chest pain (CP) or shortness of breath (SOB). Gross neurological checks normal.",
          },
          { type: "paragraph", content: "Cardiovascular: Irregularly irregular rhythm noted. Denies chest pain." },
          {
            type: "paragraph",
            content:
              "Vital Signs: BP 105/60 mmHg, Heart Rate (HR) 115 bpm (irregular), Respiratory Rate (RR) 20/min, SpO2 94% on Room Air (RA), Temperature 37.1°C.",
          },
          { type: "heading", level: 3, content: "Interventions & Response:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Placed on cardiac monitor: Confirmed Atrial Fibrillation with Rapid ventricular Response (Afib RVR).",
              "Intravenous Access: 18-gauge IV established in Left Antecubital Fossa (L AC).",
              "Labs Drawn: Complete Blood Count (CBC), Comprehensive Metabolic Panel (CMP), Troponin, Coagulation studies sent STAT.",
              "Diagnostics: 12-lead Electrocardiogram (EKG) performed - showed Afib RVR, no acute ST segment changes. Portable Chest X-ray (CXR) ordered.",
              "Fluid Resuscitation: 500cc Normal Saline (NS) bolus administered intravenously.",
            ],
          },
          { type: "heading", level: 3, content: "Response:" },
          {
            type: "paragraph",
            content:
              "Post-bolus BP improved to 115/65 mmHg, HR decreased to 105 bpm (remains irregular). Patient remains alert.",
          },
          { type: "heading", level: 3, content: "Pending:" },
          { type: "paragraph", content: "Laboratory results, CXR interpretation." },
          { type: "heading", level: 3, content: "Plan/Consults:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Dr. Evans aware of patient status. Potential initiation of Diltiazem infusion under consideration.",
              "Continue close monitoring of vital signs, cardiac rhythm, and neurological status.",
            ],
          },
        ],
      },
    },
    intro3: {
      tabLabel: "Example 3",
      title: "Experience TranscriptX - Effortless Accuracy for Your Psych Notes",
      before: {
        title: "Psychiatry Dictation",
        subtitle: "Your Raw Audio",
        contentTitle: "Your Raw Audio Dictation",
        content: [
          {
            type: "paragraph",
            content:
              "\"Okay, uh, patient is a 42-year-old male, uhm, follow-up for... Major Depressive Disorder, recurrent, severe, and GAD. He, uh, reports mood is maybe a '3 out of 10'. Still struggling with... significant anhedonia, low energy... hypersomnia noted. Uhm, some passive SI, but denies active intent, plan, or access... denies HI. Appetite is... decreased. Let's see... Current meds are Escitalopram 20mg daily... added Mirtazapine 15mg at bedtime about, uh, 3 weeks ago for sleep and appetite. Patient feels the Mirtazapine might be helping sleep slightly? But still feels quite... 'blah', his words. Affect... constricted, mood appears dysthymic. Thought process logical, uh, reality testing intact. No AVH. We discussed, uhm... maybe augmenting with Bupropion for energy and motivation? Or... increasing the Mirtazapine? Patient prefers to wait... see how current regimen settles. Okay... Plan is... continue Escitalopram 20mg daily, continue Mirtazapine 15mg QHS. Reinforce coping skills, uh, safety plan reviewed. Return to clinic... uh... 4 weeks. Okay, done.\"",
          },
        ],
      },
      after: {
        title: "TranscriptX Note",
        subtitle: "Accurate Transcription",
        contentTitle: "TranscriptX Accurate Transcription",
        content: [
          { type: "paragraph", content: "Patient: 42-year-old male" },
          {
            type: "paragraph",
            content:
              "Visit: Follow-up for Major Depressive Disorder (MDD), recurrent, severe, and Generalized Anxiety Disorder (GAD).",
          },
          { type: "heading", level: 3, content: "Subjective:" },
          {
            type: "paragraph",
            content:
              'Patient reports mood as approximately "3 out of 10". Continues to experience significant anhedonia, low energy, and hypersomnia. Reports some passive suicidal ideation (SI) but denies active intent, plan, or access to means. Denies homicidal ideation (HI). Appetite is decreased. Current medications include Escitalopram 20mg daily and Mirtazapine 15mg at bedtime (QHS), initiated approximately 3 weeks ago for sleep and appetite. Patient states Mirtazapine may be slightly improving sleep but describes overall feeling as "blah".',
          },
          { type: "heading", level: 3, content: "Objective:" },
          {
            type: "paragraph",
            content:
              "Affect appears constricted. Mood appears dysthymic. Thought process is logical and reality testing is intact. Denies auditory or visual hallucinations (AVH).",
          },
          { type: "heading", level: 3, content: "Assessment & Plan:" },
          {
            type: "paragraph",
            content:
              "Discussed potential augmentation strategies, including adding Bupropion for energy and motivation or increasing the Mirtazapine dose. Patient prefers to continue the current regimen to allow more time for therapeutic effect.",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "Continue Escitalopram 20mg PO daily.",
              "Continue Mirtazapine 15mg PO QHS.",
              "Reinforced coping skills.",
              "Safety plan reviewed and remains in place.",
              "Return to clinic (RTC) in 4 weeks for reassessment.",
            ],
          },
        ],
      },
    },
    intro4: {
      tabLabel: "Example 4",
      title: "Empower Your Advocacy with TranscriptX - Effortless Case Notes, Enhanced Client Outcomes",
      before: {
        title: "Case Dictation",
        subtitle: "Raw Audio",
        contentTitle: "Raw Dictation: Client Follow-Up",
        content: [
          {
            type: "paragraph",
            content:
              "\"Okay, this is for... uh... client file, Jane Doe, DOB 05/12/1960. Met with her today, post-discharge from General Hospital. Diagnosis... um... exacerbation of COPD and, uh, new onset Type 2 Diabetes. She's pretty overwhelmed. Lives alone, fixed income, SSI. Her apartment has stairs, making it hard with her breathing. Main concerns: medication management – new insulin, she's scared of needles – and, like, understanding her diet. Also, she mentioned feeling isolated. We talked about, um, connecting her with a senior center and a diabetes education program. Her neighbor, Tom, sometimes helps with groceries, but it's not consistent. Need to follow up on: 1) Home health referral for med setup and diabetes teaching. 2) Durable Medical Equipment – get that walker approved. 3) Arrange transport for next clinic visit. 4) Explore, uh, food assistance programs, like Meals on Wheels. She also needs... emotional support, definitely. Seems a bit depressed. Will check in again Friday. Oh, and her pharmacy is ValueCare.\"",
          },
        ],
      },
      after: {
        title: "TranscriptX Case Note",
        subtitle: "Enhanced Case Note",
        contentTitle: "TranscriptX Enhanced Case Note",
        content: [
          { type: "paragraph", content: "Client: Jane Doe" },
          { type: "paragraph", content: "DOB: 05/12/1960" },
          { type: "paragraph", content: "Date of Encounter: [Current Date, e.g., October 26, 2023]" },
          { type: "heading", level: 3, content: "Clinical Context & Assessment:" },
          {
            type: "paragraph",
            content:
              "Client seen post-discharge from General Hospital following an exacerbation of Chronic Obstructive Pulmonary Disease (COPD) and a new diagnosis of Type 2 Diabetes Mellitus. Client expresses feeling overwhelmed by new diagnoses and management requirements.",
          },
          { type: "paragraph", content: "Living Situation: Resides alone, fixed income (SSI)." },
          {
            type: "paragraph",
            content:
              "Environmental Barriers: Apartment accessibility is a concern due to stairs, impacting mobility secondary to dyspnea from COPD.",
          },
          {
            type: "paragraph",
            content:
              "Psychosocial: Client reports feelings of isolation and exhibits potential indicators of depression.",
          },
          { type: "heading", level: 3, content: "Identified Needs & Concerns:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Medication Management: Difficulty with new insulin regimen, including fear of injections. Requires education on diabetes self-management (DSM).",
              "Dietary Adherence: Requires education and support for managing a diabetic diet.",
              "Social Support & Engagement: Needs connection to community resources to combat isolation.",
              "Mobility & Safety: Requires assistive device (walker) and support for navigating environmental barriers.",
              "Instrumental Activities of Daily Living (IADLs): Inconsistent support for groceries.",
              "Access to Care: Requires transportation assistance for future appointments.",
              "Emotional Well-being: Expressed need for emotional support.",
            ],
          },
          { type: "heading", level: 3, content: "Action Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Home Health Services: Initiate referral for home health nursing for medication reconciliation, insulin administration training, and comprehensive diabetes education.",
              "Durable Medical Equipment (DME): Facilitate request and authorization for a walker.",
              "Transportation: Arrange non-emergency medical transportation for the next clinic visit.",
              "Nutritional Support: Explore eligibility and assist with application for food assistance programs (e.g., Meals on Wheels, SNAP).",
              "Community Integration: Provide referrals and facilitate connection to a local senior center and a diabetes support/education program.",
              "Follow-Up: Schedule follow-up contact with client by Friday to assess progress and provide ongoing support.",
            ],
          },
          {
            type: "paragraph",
            content:
              "Pharmacy Coordination: Note: Client's preferred pharmacy is ValueCare for future medication-related coordination.",
          },
        ],
      },
    },
  },
  Chartwright: {
    features1: {
      tabLabel: "Example 1",
      title: "Experience Chartwright - Clean and Structure Messy Clinical Notes",
      before: {
        title: "Doctor Note",
        subtitle: "Messy Original",
        contentTitle: "Messy Original Doctor Note",
        content: [
          { type: "paragraph", content: "Pateint Name: Sarah Jones\nDOB: 03/10/1985\nDate: 11/03/2023" },
          { type: "paragraph", content: "Reasn 4 Visit: Follow up for hypertensioin and recent URI." },
          { type: "heading", level: 3, content: "Subjectiv:" },
          {
            type: "paragraph",
            content:
              "Pt states blood pressre readings at home have been betetr since adjusting lisinopril dose. Had a cold last week, mostly over now but still has a lingering cough, non-productive. Denies fevr, chills, shortness of breath. Symtoms stared bout 10 days ago. Used OTC cough drops. No new c/o regarding BP. Is tryin to eat better, more vegtabls. Excercise is hit or miss this week due to the cold. Sleep ok when not coughing. Non-smoker, social alc.",
          },
          { type: "heading", level: 3, content: "Objective:" },
          {
            type: "paragraph",
            content:
              "BP 135/88 seated R arm. Pulse 72, RR 16, Temp 36.8C. Genrl appearance: Appears well, mild cough noted during exam. HEENT: Mucous membrans moist, no congestion. Lungs: Clear to auscsulation bilaterally, no wheezes or crackles heard. Heart: RRR, no murmurs. Abdomen: soft, non-tender. Skin: warm and dry. Exam w/n normal limits except for cough.",
          },
          { type: "heading", level: 3, content: "Assessment:" },
          {
            type: "list",
            ordered: false,
            items: ["Hypertenson, improved control.", "Resolving Upper Respiratry Infection with residual cough."],
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Continue Lisinopril 10mg daily.",
              "Monitor BP at home, f/u in 3 months or sooner if BP increases.",
              "Reassure pt cough should resolve over next 1-2 weeks. OTC cough suppressants ok if bothersome at night.",
              "Encourage continued healthy diet and exercise once URI symtoms fully resolved.",
            ],
          },
        ],
      },
      after: {
        title: "Chartwright Chart",
        subtitle: "AI-Enhanced",
        contentTitle: "Chartwright-Enhanced Chart",
        content: [
          { type: "paragraph", content: "Patient: Sarah Jones (DOB: 03/10/1985)" },
          { type: "paragraph", content: "Visit Date: 2023-11-03" },
          { type: "paragraph", content: "Reason: Follow-up (Hypertension, Resolving URI)" },
          { type: "heading", level: 3, content: "Subjective Report:" },
          { type: "paragraph", content: "Hypertension: Improved home BP readings since lisinopril adjustment." },
          {
            type: "paragraph",
            content:
              "URI: Symptoms resolving (started ~10 days ago), persistent non-productive cough. Denies fever, chills, SOB. Used OTC cough drops.",
          },
          {
            type: "paragraph",
            content:
              "Lifestyle: Attempting better diet (more vegetables). Exercise inconsistent due to cold. Sleep okay except for cough. Non-smoker, social alcohol.",
          },
          { type: "heading", level: 3, content: "Objective Data:" },
          { type: "paragraph", content: "Vitals (11/03/2023): BP 135/88, P 72, RR 16, T 36.8C" },
          { type: "paragraph", content: "General: Appears well, mild cough noted." },
          {
            type: "paragraph",
            content:
              "Exam: HEENT clear, Lungs clear to auscultation, Heart RRR, Abdomen soft/non-tender, Skin warm/dry. Exam WNL except for cough.",
          },
          { type: "heading", level: 3, content: "Assessment:" },
          {
            type: "list",
            ordered: false,
            items: ["Hypertension, improved control.", "Resolving URI with residual cough."],
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Medication: Continue Lisinopril 10mg daily.",
              "Hypertension: Continue home BP monitoring, follow-up in 3 months or sooner if BP increases.",
              "Cough: Reassure resolution expected 1-2 weeks. OTC suppressants okay prn for sleep.",
              "Lifestyle: Encourage healthy diet & exercise once URI resolved.",
            ],
          },
        ],
      },
    },
    features2: {
      tabLabel: "Example 2",
      title: "Discover Chartwright - Clarify and Organize Therapy Notes",
      before: {
        title: "Therapy Note",
        subtitle: "Messy Original",
        contentTitle: "Messy Original Therapy Note",
        content: [
          { type: "paragraph", content: "Pateint Name: Emily White\nDate: 11/04/2023\nSeshion #: 8" },
          { type: "paragraph", content: "Focs: Social anxiety and assertiveness training." },
          { type: "heading", level: 3, content: "Subjevtive:" },
          {
            type: "paragraph",
            content:
              "Pt reported attending a social event over the weekend, wich was a goal fr her. Felt very anxius beforehand, almost didn't go. Managed to stay for about an hour and talk to 2 people, wich she considers a smal success. Noted hart pounding and sweating while talking. Feels a bit discourajed that it was still so hard, despight practicing skills. Also mentioned a conflicht at work where she felt unable to speek up for herself. Sleep has been poor past cuple nites due to worry abt work stuff. No self harm ideation.",
          },
          { type: "heading", level: 3, content: "Objetive:" },
          {
            type: "paragraph",
            content:
              "Pt presented somewhat flat affect initially, gradualy warmed up during session. Speech quiet but clear. Maintained eye contact inconsistantly. Showed insight into connection between anxiety and avoidance. Appeared engaged when discussing strategies. Denied any SI/HI.",
          },
          { type: "heading", level: 3, content: "Interventions:" },
          {
            type: "paragraph",
            content:
              'Reviewed wkend social event expereince, validated feelings of anxiaty and discourajement. Praised effort in attending and staying for an hour. Used CBT frame wrk to challenge negative automatic thoghts about social performance ("everyone can see I\'m nervous"). Practised assertiveness phrases thru role-playing a work scenrio. Assigned homework: Attend one planned social interaction (even brief) and practice one assertive statement at work or home this week.',
          },
          { type: "heading", level: 3, content: "Assessmant:" },
          {
            type: "paragraph",
            content:
              "Diagnosis: Social Anxiety Disorder (Severe). Patient is demonstrating willingness to engage in exposure tasks (social event) but high anxiety levels persist. Difficulty with assertiveness remains a significant barrier. Sleep impacted by general anxiety/worry. Making gradual progress, needs continued reinforcement of skills.",
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "paragraph",
            content:
              "Contine weekly therapy. Focus on gradual exposure hierarchy for social situations. Intensify assertiveness training. Briefly touch on sleep hygeine next session if persists.",
          },
        ],
      },
      after: {
        title: "Chartwright Chart",
        subtitle: "AI-Enhanced",
        contentTitle: "Chartwright-Enhanced Chart",
        content: [
          { type: "paragraph", content: "Patient: Emily White" },
          { type: "paragraph", content: "Visit Date: 2023-11-04" },
          { type: "paragraph", content: "Session #: 8" },
          { type: "paragraph", content: "Primary Focus: Social Anxiety / Assertiveness Training" },
          { type: "heading", level: 3, content: "Subjective Report:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Social Event: Attended weekend event (goal), experienced high anxiety (palpitations, sweating), stayed 1 hour, talked to 2 people (small success). Felt discouraged by difficulty.",
              "Work Conflict: Felt unable to speak up.",
              "Sleep: Poor past couple nights (work worry).",
              "Safety: Denied self-harm ideation.",
            ],
          },
          { type: "heading", level: 3, content: "Objective Observation:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Presentation: Initially flat affect, warmed up; quiet speech; inconsistent eye contact.",
              "Cognition: Showed insight into anxiety/avoidance.",
              "Engagement: Appeared engaged during strategy discussion.",
              "Safety: Denied SI/HI.",
            ],
          },
          { type: "heading", level: 3, content: "Interventions Provided:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Reviewed social event experience, validated feelings, praised effort.",
              "Challenged negative automatic thoughts (CBT framework).",
              "Practiced assertiveness through role-playing work scenario.",
              "Assigned Homework: Attend planned social interaction, practice one assertive statement.",
            ],
          },
          { type: "heading", level: 3, content: "Assessment:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Diagnosis: Social Anxiety Disorder (Severe).",
              "Progress: Willingness to attempt exposure; high anxiety persists.",
              "Barriers: Difficulty with assertiveness, sleep impacted by worry.",
              "Overall: Making gradual progress, needs skill reinforcement.",
            ],
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Frequency: Continue weekly therapy.",
              "Techniques: Focus on gradual exposure hierarchy, intensify assertiveness training.",
              "Future Focus: Briefly address sleep hygiene if needed next session.",
              "Homework: Follow up on assigned tasks.",
            ],
          },
        ],
      },
    },
    features3: {
      tabLabel: "Example 3",
      title: "Transform Chartwright - Organize Messy Nurse Notes for Efficiency",
      before: {
        title: "Nurse Note",
        subtitle: "Messy Original",
        contentTitle: "Messy Original Nurse Note",
        content: [
          {
            type: "paragraph",
            content: "Pateint Name: Robert Davis\nMRN: 1234567\nDate: 11/05/2023 Time: 14:30\nShift: Day",
          },
          { type: "heading", level: 3, content: "Assessment/Observations:" },
          {
            type: "paragraph",
            content:
              "Pt seen in room 302. Complained of paen 5/10 in his left leg, which is where he had surgery yesterday. Pain is worse w/ movement. Denys chst pain or shrtness of breath. Vital signs done: BP 145/92, P 88, R 18, Temp 37.5 C, SaO2 96% on room air. Lung sonds clear bilaterally. Heart sounds RRR. Abd soft, non-tndr. Surgical site dressing is clean, dry, and intact, no excess drainage noted. Pedal pules 2+ bilaterally. Cap refill <3 secs. Skin warm and dry. Pt tolerating full liquid diet. Ambulated to chair with assist of 1, tolerated well, no dizziness reported. Asked for pain med. call light within reach.",
          },
          { type: "heading", level: 3, content: "Interventions/Plan:" },
          {
            type: "paragraph",
            content:
              "Administered Morphine 2mg IV push for paen at 14:15 per PRN order. Pain re-assess due 15:15. Encouragd deep breathing and coughing x5. Reminded pt to use incntive spirometer hourly while awake. Reinforced need to call for assist before getting up. Continue monitoring vitals q4h. Notified MD Dr. Adams re: pt's leg pain and BP. Orders reviewed, no changes made by MD. Charting complete.",
          },
        ],
      },
      after: {
        title: "Chartwright Chart",
        subtitle: "AI-Enhanced",
        contentTitle: "Chartwright-Enhanced Chart",
        content: [
          { type: "paragraph", content: "Patient: Robert Davis (MRN: 1234567)" },
          { type: "paragraph", content: "Date/Time: 2023-11-05 / 14:30" },
          { type: "paragraph", content: "Shift: Day" },
          { type: "heading", level: 3, content: "Subjective Report:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Pain: Left leg 5/10 (surgical site), worse with movement.",
              "Other: Denies chest pain, shortness of breath.",
            ],
          },
          { type: "heading", level: 3, content: "Objective Data:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Vitals (14:30): BP 145/92, P 88, RR 18, T 37.5C, SaO2 96% RA.",
              "Assessment: Lungs clear, Heart RRR, Abdomen soft/non-tender. Surgical site dressing CDI, minimal drainage. Pedal pulses 2+ bilat, Cap refill <3s. Skin warm/dry.",
              "Activity: Ambulated to chair with assist x1, tolerated well, no dizziness.",
              "Intake: Tolerating full liquid diet.",
            ],
          },
          { type: "heading", level: 3, content: "Interventions & Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Medication: Administered Morphine 2mg IVP at 14:15 (PRN).",
              "Monitoring: Pain re-assessment due 15:15. Monitor vitals q4h.",
              "Pulmonary: Encouraged deep breathing/coughing x5. Reminded IS hourly.",
              "Safety: Reinforced call for assist before ambulating. Call light within reach.",
              "Communication: Notified Dr. Adams re: leg pain and BP. Orders reviewed, no changes.",
              "Charting: Complete.",
            ],
          },
        ],
      },
    },
  },
  Redactify: {
    pricing1: {
      tabLabel: "Example 1",
      title: "Experience Redactify - Effortlessly Redact HIPAA Identifiers & Automate Compliance",
      before: {
        title: "Doctor's Note",
        subtitle: "Original",
        contentTitle: "Original Doctor's Note",
        content: [
          {
            type: "paragraph",
            content:
              "Patient Name: Jane Smith\nDOB: 07/22/1968\nAddress: 456 Oak Avenue, Springfield, IL 62704\nPhone: (217) 555-0199\nMRN: JS654321\nDate of Visit: 2024-05-21\nAttending Physician: Dr. Robert Miller\nClinic: Springfield Community Health Clinic",
          },
          { type: "heading", level: 3, content: "Subjective:" },
          {
            type: "paragraph",
            content:
              "Ms. Jane Smith, a 55-year-old female, presents for her annual check-up on May 21, 2024. She reports feeling generally well. She mentions occasional lower back pain, especially after prolonged sitting. No fever, chills, or recent illness. She is currently taking Metformin for Type 2 Diabetes. Her last A1c was 6.8%. She lives at 456 Oak Avenue with her husband. Her contact number is (217) 555-0199.",
          },
          { type: "heading", level: 3, content: "Objective:" },
          {
            type: "paragraph",
            content: "Vital Signs: BP 130/80 mmHg, HR 75 bpm, RR 18/min, Temp 98.2°F. Weight: 165 lbs.",
          },
          { type: "paragraph", content: "Physical Exam:" },
          {
            type: "list",
            ordered: false,
            items: [
              "General: Alert and oriented x3, in no acute distress.",
              "Cardiovascular: Regular rate and rhythm. No murmurs.",
              "Respiratory: Lungs clear to auscultation bilaterally.",
              "Musculoskeletal: Mild tenderness on palpation of lumbar paraspinal muscles. Good range of motion in spine.",
            ],
          },
          { type: "paragraph", content: "Labs: Reviewed recent labs from 05/15/2024." },
          { type: "heading", level: 3, content: "Assessment:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Type 2 Diabetes Mellitus, stable on current medication.",
              "Chronic Lower Back Pain, likely musculoskeletal.",
              "Preventative Health Maintenance.",
            ],
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Continue Metformin 500mg BID.",
              "Recommend physical therapy referral for lower back pain evaluation and management.",
              "Encourage regular exercise and stretching.",
              "Schedule follow-up appointment in 6 months at Springfield Community Health Clinic with Dr. Miller.",
            ],
          },
          {
            type: "paragraph",
            content: "Patient Jane Smith agrees with the plan. Will call clinic if symptoms worsen.",
          },
          { type: "paragraph", content: "Next appointment booked for November 21, 2024." },
          {
            type: "paragraph",
            content:
              "Electronically Signed: Dr. Robert Miller, MD\nSpringfield Community Health Clinic\nDate: 2024-05-21",
          },
        ],
      },
      after: {
        title: "Redactify Note",
        subtitle: "HIPAA Compliant",
        contentTitle: "Redactify AI-Enhanced Note (HIPAA Compliant)",
        content: [
          {
            type: "paragraph",
            content:
              "Patient Name: REDACT\nDOB: REDACT\nAddress: REDACT\nPhone: REDACT\nMRN: REDACT\nDate of Visit: REDACT\nAttending Physician: REDACT\nClinic: REDACT",
          },
          { type: "heading", level: 3, content: "Subjective:" },
          {
            type: "paragraph",
            content:
              "Ms. REDACT, a 55-year-old female, presents for her annual check-up on REDACT. She reports feeling generally well. She mentions occasional lower back pain, especially after prolonged sitting. No fever, chills, or recent illness. She is currently taking Metformin for Type 2 Diabetes. Her last A1c was 6.8%. She lives at REDACT with her husband. Her contact number is REDACT.",
          },
          { type: "heading", level: 3, content: "Objective:" },
          {
            type: "paragraph",
            content: "Vital Signs: BP 130/80 mmHg, HR 75 bpm, RR 18/min, Temp 98.2°F. Weight: 165 lbs.",
          },
          { type: "paragraph", content: "Physical Exam:" },
          {
            type: "list",
            ordered: false,
            items: [
              "General: Alert and oriented x3, in no acute distress.",
              "Cardiovascular: Regular rate and rhythm. No murmurs.",
              "Respiratory: Lungs clear to auscultation bilaterally.",
              "Musculoskeletal: Mild tenderness on palpation of lumbar paraspinal muscles. Good range of motion in spine.",
            ],
          },
          { type: "paragraph", content: "Labs: Reviewed recent labs from REDACT." },
          { type: "heading", level: 3, content: "Assessment:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Type 2 Diabetes Mellitus, stable on current medication.",
              "Chronic Lower Back Pain, likely musculoskeletal.",
              "Preventative Health Maintenance.",
            ],
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Continue Metformin 500mg BID.",
              "Recommend physical therapy referral for lower back pain evaluation and management.",
              "Encourage regular exercise and stretching.",
              "Schedule follow-up appointment in 6 months at REDACT with REDACT.",
            ],
          },
          { type: "paragraph", content: "Patient REDACT agrees with the plan. Will call clinic if symptoms worsen." },
          { type: "paragraph", content: "Next appointment booked for REDACT." },
          { type: "paragraph", content: "Electronically Signed: REDACT, MD\nREDACT\nDate: REDACT" },
        ],
      },
    },
    pricing2: {
      tabLabel: "Example 2",
      title: "Discover Redactify - Securely Anonymize Therapy Notes in Seconds",
      before: {
        title: "Therapist Note",
        subtitle: "Original",
        contentTitle: "Original Therapist Note",
        content: [
          {
            type: "paragraph",
            content:
              "Client Name: Michael Chen\nDate of Birth: 03/15/1988\nClient ID: MC031588\nSession Date: October 26, 2023\nTherapist: Dr. Eleanor Vance, PsyD\nPractice: Serene Pathways Therapy Center, 123 Wellness Drive, Anytown, CA 90210\nContact: (310) 555-0123",
          },
          { type: "paragraph", content: "Session Focus: Management of work-related stress and anxiety." },
          { type: "heading", level: 3, content: "Subjective:" },
          {
            type: "paragraph",
            content:
              'Michael Chen (Client ID: MC031588) presented for his scheduled session on October 26, 2023, reporting continued high levels of stress stemming from his job at Tech Solutions Inc. He described a recent critical project deadline and interpersonal difficulties with a colleague, specifically naming Mark Olsen. Michael lives at 789 Elm Street, Anytown, and mentioned that the stress is impacting his sleep and relationship with his wife, Sarah Chen, and son, Leo Chen. He stated, "I just feel overwhelmed all the time, and it\'s hard to switch off when I get home to 789 Elm Street." His email is michael.chen@emailprovider.com.',
          },
          { type: "heading", level: 3, content: "Therapist's Observations:" },
          {
            type: "paragraph",
            content:
              "Client appeared fatigued but was articulate and engaged throughout the session. Affect was predominantly anxious, with some moments of frustration when discussing work dynamics. No suicidal or homicidal ideation reported. Michael mentioned an upcoming performance review on November 10, 2023.",
          },
          { type: "heading", level: 3, content: "Assessment:" },
          {
            type: "paragraph",
            content:
              "Client continues to meet criteria for Generalized Anxiety Disorder. Stressors are primarily work-related, with some spillover into home life. Coping mechanisms discussed previously (mindfulness, exercise) are being used intermittently. Client is motivated for change.",
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Continue weekly CBT sessions.",
              "Review and reinforce mindfulness techniques for stress reduction, particularly for use during work breaks.",
              "Explore assertive communication strategies for dealing with workplace conflicts.",
              "Homework: Client to practice a 5-minute breathing exercise daily and journal challenging thoughts related to work at Tech Solutions Inc.",
            ],
          },
          {
            type: "paragraph",
            content: "Next session scheduled for November 2, 2023, at Serene Pathways Therapy Center.",
          },
          {
            type: "paragraph",
            content: "Discussed potential referral to Dr. Smith at Anytown Psychiatry if symptoms do not improve.",
          },
          {
            type: "paragraph",
            content:
              "Signature: Dr. Eleanor Vance, PsyD\nSerene Pathways Therapy Center\n123 Wellness Drive, Anytown, CA 90210",
          },
        ],
      },
      after: {
        title: "Redactify Note",
        subtitle: "HIPAA Compliant",
        contentTitle: "Redactify AI-Enhanced Note (HIPAA Compliant)",
        content: [
          {
            type: "paragraph",
            content:
              "Client Name: REDACT\nDate of Birth: REDACT\nClient ID: REDACT\nSession Date: REDACT\nTherapist: REDACT\nPractice: REDACT\nContact: REDACT",
          },
          { type: "paragraph", content: "Session Focus: Management of work-related stress and anxiety." },
          { type: "heading", level: 3, content: "Subjective:" },
          {
            type: "paragraph",
            content:
              'REDACT (Client ID: REDACT) presented for his scheduled session on REDACT, reporting continued high levels of stress stemming from his job at REDACT. He described a recent critical project deadline and interpersonal difficulties with a colleague, specifically naming REDACT. REDACT lives at REDACT, and mentioned that the stress is impacting his sleep and relationship with his wife, REDACT, and son, REDACT. He stated, "I just feel overwhelmed all the time, and it\'s hard to switch off when I get home to REDACT." His email is REDACT.',
          },
          { type: "heading", level: 3, content: "Therapist's Observations:" },
          {
            type: "paragraph",
            content:
              "Client appeared fatigued but was articulate and engaged throughout the session. Affect was predominantly anxious, with some moments of frustration when discussing work dynamics. No suicidal or homicidal ideation reported. REDACT mentioned an upcoming performance review on REDACT.",
          },
          { type: "heading", level: 3, content: "Assessment:" },
          {
            type: "paragraph",
            content:
              "Client continues to meet criteria for Generalized Anxiety Disorder. Stressors are primarily work-related, with some spillover into home life. Coping mechanisms discussed previously (mindfulness, exercise) are being used intermittently. Client is motivated for change.",
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Continue weekly CBT sessions.",
              "Review and reinforce mindfulness techniques for stress reduction, particularly for use during work breaks.",
              "Explore assertive communication strategies for dealing with workplace conflicts.",
              "Homework: Client to practice a 5-minute breathing exercise daily and journal challenging thoughts related to work at REDACT.",
            ],
          },
          { type: "paragraph", content: "Next session scheduled for REDACT, at REDACT." },
          {
            type: "paragraph",
            content: "Discussed potential referral to REDACT at REDACT if symptoms do not improve.",
          },
          { type: "paragraph", content: "Signature: REDACT\nREDACT\nREDACT" },
        ],
      },
    },
  },
  Validify: {
    support1: {
      tabLabel: "Example 1",
      title: "Discover Validify - Optimize Chart Reviews for Compliance & Accuracy (use case)",
      before: {
        title: "Clinical Documentation",
        subtitle: "Original",
        contentTitle: "Original Clinical Documentation",
        content: [
          { type: "paragraph", content: "Patient: John Smith, DOB: 03/15/1968. Encounter Date: 10/26/2023." },
          { type: "heading", level: 3, content: "Chief Complaint:" },
          { type: "paragraph", content: "Chest pain, shortness of breath." },
          { type: "heading", level: 3, content: "History of Present Illness:" },
          {
            type: "paragraph",
            content:
              "Patient reports experiencing intermittent chest pain for the past 3 days, described as a pressure-like sensation radiating to the left arm. Also reports shortness of breath, especially with exertion. No fever, cough, or leg swelling.",
          },
          { type: "heading", level: 3, content: "Past Medical History:" },
          { type: "paragraph", content: "Hypertension, Type 2 Diabetes Mellitus, Hyperlipidemia." },
          { type: "heading", level: 3, content: "Medications:" },
          {
            type: "paragraph",
            content: "Lisinopril 20mg daily, Metformin 1000mg twice daily, Atorvastatin 40mg daily.",
          },
          { type: "heading", level: 3, content: "Physical Exam:" },
          {
            type: "list",
            ordered: false,
            items: [
              "General: Appears anxious, diaphoretic.",
              "Cardiovascular: Regular heart rate, but slightly elevated at 98 bpm. No murmurs auscultated.",
              "Respiratory: Clear to auscultation bilaterally, but increased respiratory rate of 22 breaths per minute.",
              "Extremities: No edema.",
            ],
          },
          { type: "heading", level: 3, content: "Assessment:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Chest pain, possible angina. Rule out cardiac etiology.",
              "Shortness of breath, etiology unclear. Possible cardiac or pulmonary cause.",
            ],
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Order EKG, Troponin, CBC, BMP, Chest X-Ray.",
              "Administer Oxygen 2L via nasal cannula.",
              "Start Aspirin 325mg PO.",
              "Cardiac monitoring.",
              "Consult Cardiology if Troponin elevated or EKG changes concerning for ischemia.",
            ],
          },
        ],
      },
      after: {
        title: "Validify Analysis",
        subtitle: "Recommendations",
        contentTitle: "Validify Analysis & Recommendations",
        content: [
          { type: "heading", level: 3, content: "Initial Review:" },
          { type: "paragraph", content: "Patient: John Smith, DOB: 03/15/1968\nEncounter Date: 10/26/2023" },
          { type: "heading", level: 3, content: "Potential ICD-10-CM Codes (Provisional - Requires Confirmation):" },
          {
            type: "list",
            ordered: false,
            items: [
              "R07.9 Chest pain, unspecified",
              "R06.02 Shortness of breath",
              "I10 Essential (primary) hypertension",
              "E11.9 Type 2 diabetes mellitus without complications",
              "E78.5 Hyperlipidemia, unspecified",
            ],
          },
          {
            type: "heading",
            level: 3,
            content: "Potential CPT/HCPCS Codes (Based on Plan - Requires Documentation Confirmation):",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "99213 (Level 3 Established Patient Office Visit) - Consider 99214 based on complexity of the encounter",
              "93000 (Electrocardiogram, routine ECG with at least 12 leads)",
              "84484 (Troponin I)",
              "85025 (Complete blood count, automated)",
              "80053 (Comprehensive metabolic panel)",
              "71045 (Radiologic examination, chest, single view)",
              "94760 (Pulse oximetry)",
              "92960 (Cardioversion, elective, electrical conversion of arrhythmia; external) might be used if EKG shows arrhythmia.",
            ],
          },
          { type: "heading", level: 3, content: "Flags & Considerations:" },
          {
            type: "list",
            ordered: false,
            items: [
              'Chest Pain Etiology: The documentation indicates "possible angina" and "rule out cardiac etiology." Further clarification is needed to determine the specific type of chest pain and whether it is definitively attributed to a cardiac condition. Query physician for clarification if Troponin and EKG are negative.',
              "Shortness of Breath Etiology: The etiology of the shortness of breath is unclear. Further investigation is required to determine the underlying cause (cardiac vs. pulmonary). Follow-up on Chest X-Ray results is critical.",
              "Specificity of Hyperlipidemia: Consider querying the physician regarding the specific type of hyperlipidemia (e.g., pure hypercholesterolemia, mixed hyperlipidemia) for more accurate coding.",
              "Aspirin Administration: The plan includes administering Aspirin 325mg PO. Ensure documentation includes route of administration (PO) and dosage in the medication administration record.",
              "Cardiac Monitoring: The type and duration of cardiac monitoring should be documented to determine appropriate CPT code(s).",
              "Oxygen Administration: confirm and document the method and flow rate",
              "Cardiology Consult: If a cardiology consult occurs, the documentation should reflect the findings and recommendations of the consulting physician, which may impact coding.",
            ],
          },
          { type: "heading", level: 3, content: "Potential Missing Information:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Family history relevant to cardiac disease.",
              "Social history (smoking, alcohol use).",
              "Detailed description of the chest pain characteristics (e.g., location, duration, severity, aggravating/relieving factors).",
            ],
          },
          { type: "heading", level: 3, content: "Disclaimer:" },
          {
            type: "paragraph",
            content:
              "The information provided by Validify is for assistance only. It is based on the provided text and current coding/compliance guidelines. All suggestions and assessments must be reviewed and validated by a qualified medical coding professional and/or clinician. Validify's output should not be considered definitive and does not replace the need for professional human judgment",
          },
        ],
      },
    },
    support2: {
      tabLabel: "Example 2",
      title: "Discover Validify - Optimize Chart Reviews for Compliance & Accuracy (surgical use case)",
      before: {
        title: "Clinical Documentation",
        subtitle: "Original",
        contentTitle: "Original Clinical Documentation",
        content: [
          { type: "paragraph", content: "Operative Report" },
          { type: "paragraph", content: "Patient: Jane Doe, DOB: 06/10/1972. Date of Surgery: 11/15/2023" },
          {
            type: "paragraph",
            content: "Pre-operative Diagnosis: Cholecystitis Post-operative Diagnosis: Same (Cholecystitis)",
          },
          { type: "paragraph", content: "Procedure: Laparoscopic Cholecystectomy" },
          { type: "paragraph", content: "Surgeon: Dr. Smith Assistant: Dr. Jones" },
          { type: "paragraph", content: "Anesthesia: General" },
          { type: "heading", level: 3, content: "Findings:" },
          { type: "paragraph", content: "The gallbladder was inflamed. Some adhesions. Stones." },
          { type: "heading", level: 3, content: "Description of Procedure:" },
          {
            type: "paragraph",
            content:
              "The patient was prepped and draped in the usual sterile fashion. A small incision was made in the umbilicus. The abdomen was insufflated. We took out the gallbladder. The cystic duct and artery were clipped and cut. The gallbladder was removed from the abdomen and sent to pathology. The abdomen was desufflated. The skin was closed with staples. Patient tolerated the procedure well. EBL minimal.",
          },
          { type: "heading", level: 3, content: "Complications:" },
          { type: "paragraph", content: "None" },
        ],
      },
      after: {
        title: "Validify Analysis",
        subtitle: "Recommendations",
        contentTitle: "Validify Analysis & Recommendations",
        content: [
          { type: "heading", level: 3, content: "Initial Review:" },
          { type: "paragraph", content: "Patient: Jane Doe, DOB: 06/10/1972\nDate of Surgery: 11/15/2023" },
          { type: "heading", level: 3, content: "Potential ICD-10-CM Codes (Provisional - Requires Confirmation):" },
          {
            type: "list",
            ordered: false,
            items: [
              "K81.9 Cholecystitis, unspecified - Query for acute vs. chronic if not specified elsewhere in the record.",
            ],
          },
          {
            type: "heading",
            level: 3,
            content: "Potential CPT Codes (Based on Description - Requires Documentation Confirmation):",
          },
          { type: "list", ordered: false, items: ["47562 Laparoscopy, surgical; cholecystectomy"] },
          { type: "heading", level: 3, content: "Flags & Considerations:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Laterality: Gallbladder is a single organ, Laterality is not applicable",
              'Post-operative Diagnosis: While "same" is indicated, it\'s best practice to restate the post-operative diagnosis for clarity. Ensure the post-operative diagnosis accurately reflects the findings (e.g., if gangrenous cholecystitis was found, the post-op diagnosis should reflect that).',
              'Specificity of Cholecystitis: The ICD-10-CM code K81.9 is "unspecified." The documentation needs to clarify if the cholecystitis was acute or chronic. Query the surgeon for clarification.',
              "Adhesions: The presence of adhesions is noted. If adhesiolysis (removal of adhesions) added significant time and effort to the procedure, consider if additional CPT code 47561(Laparoscopy, surgical; with cholecystectomy with exploration of common duct) should be reported.",
              "Description of Procedure Detail: The operative description is very brief. It lacks detail regarding the method of gallbladder dissection (e.g., blunt dissection, electrocautery). It does not specify the type of clips used (e.g., titanium, absorbable). It doesn't mention any irrigation of the surgical site. Insufficient to differentiate 47562 vs 47563 (Cholecystectomy with cholangiography)",
              "Specimen to Pathology: The pathology report should be reviewed to confirm the diagnosis and identify any incidental findings.",
              'Closure: "Skin closed with staples" is acceptable but could be more specific (e.g., number of staples, type of closure – single layer, etc.).',
              'EBL: While "minimal" is stated, quantifying the estimated blood loss (e.g., "EBL < 25mL") is preferred.',
              "Assistant Surgeon: Dr. Jones assisted. Determine if assistant surgeon documentation supports billing for an assistant at surgery.",
              "Documentation Deficiencies: Very little is documented, which could cause medical necessity concerns",
            ],
          },
          { type: "heading", level: 3, content: "Potential Missing Information:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Pre-operative lab values or imaging results that led to the decision for surgery.",
              "Details of any intraoperative complications or difficulties encountered.",
              "Drains placed (if any).",
              "Post-operative instructions given to the patient.",
            ],
          },
          { type: "heading", level: 3, content: "Disclaimer:" },
          {
            type: "paragraph",
            content:
              "The information provided by Validify is for assistance only. It is based on the provided text and current coding/compliance guidelines. All suggestions and assessments must be reviewed and validated by a qualified medical coding professional and/or clinician. Validify's output should not be considered definitive and does not replace the need for professional human judgment.",
          },
        ],
      },
    },
    support3: {
      tabLabel: "Example 3",
      title: "Discover Validify - Optimize Chart Reviews for Compliance & Accuracy (Psychologist Use case)",
      before: {
        title: "Clinical Documentation",
        subtitle: "Original",
        contentTitle: "Original Clinical Documentation",
        content: [
          { type: "paragraph", content: "Patient: Sarah Miller, DOB: 04/22/1988. Date of Service: 11/16/2023" },
          { type: "heading", level: 3, content: "Chief Complaint:" },
          { type: "paragraph", content: "Anxiety and depressed mood." },
          { type: "paragraph", content: "Session Type: Individual Psychotherapy, 60 minutes" },
          { type: "heading", level: 3, content: "Presenting Problem:" },
          {
            type: "paragraph",
            content:
              "Ms. Miller reports feeling overwhelmed by work and relationship stressors. She states she has been experiencing increased anxiety, difficulty sleeping, and a persistent low mood for the past month. She reports feeling hopeless and having difficulty concentrating. Denies suicidal ideation.",
          },
          { type: "heading", level: 3, content: "Intervention:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Explored the patient's current stressors and their impact on her mood and anxiety.",
              "Discussed coping mechanisms for managing stress, including mindfulness exercises and time management techniques.",
              "Reviewed thought records and challenged negative thought patterns using cognitive restructuring techniques.",
              "Assigned homework: Practice mindfulness meditation daily and continue to track negative thoughts.",
            ],
          },
          { type: "heading", level: 3, content: "Mental Status:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Appearance: Well-groomed, but appears tired.",
              "Mood: Depressed.",
              "Affect: Constricted.",
              "Thought Process: Goal-directed.",
              "Thought Content: Negative, self-critical.",
              "Insight: Fair.",
              "Judgment: Good.",
            ],
          },
          { type: "heading", level: 3, content: "Diagnosis:" },
          {
            type: "list",
            ordered: false,
            items: [
              "F41.1 Generalized Anxiety Disorder",
              "F32.9 Major Depressive Disorder, Single Episode, Unspecified",
            ],
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "paragraph",
            content:
              "Continue individual psychotherapy weekly. Monitor mood and anxiety levels. Consider medication consultation if symptoms do not improve.",
          },
        ],
      },
      after: {
        title: "Validify Analysis",
        subtitle: "Recommendations",
        contentTitle: "Validify Analysis & Recommendations",
        content: [
          { type: "heading", level: 3, content: "Initial Review:" },
          { type: "paragraph", content: "Patient: Sarah Miller, DOB: 04/22/1988\nDate of Service: 11/16/2023" },
          { type: "heading", level: 3, content: "Potential ICD-10-CM Codes:" },
          {
            type: "list",
            ordered: false,
            items: [
              "F41.1 Generalized Anxiety Disorder",
              "F32.9 Major Depressive Disorder, Single Episode, Unspecified - Query if severity can be specified (e.g., mild, moderate, severe) based on clinical assessment.",
            ],
          },
          {
            type: "heading",
            level: 3,
            content: "Potential CPT Codes (Based on Documentation - Requires Confirmation):",
          },
          { type: "list", ordered: false, items: ["90837 Individual psychotherapy, 60 minutes with patient"] },
          { type: "heading", level: 3, content: "Flags & Considerations:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Documentation of Time: The session is documented as 60 minutes. The actual face-to-face time spent with the patient must meet the minimum time requirements for the chosen CPT code (90837 requires 53-60 minutes). Ensure the time is accurately documented and supported by the session content.",
              'Specificity of Depressive Disorder: F32.9 is "unspecified." Determine if the record supports a more specific code based on the severity or presence of psychotic features. (e.g., F32.1 - Moderate, F32.2- Severe without psychotic features).',
              "Treatment Plan Specificity: The treatment plan is somewhat general. Future notes should document specific goals and objectives of treatment and progress toward those goals.",
              "Denial of Suicidal Ideation: Documenting the denial of suicidal ideation is important, but follow-up questions regarding homicidal ideation, self-harm behaviors, or a history of attempts should also be considered and documented as appropriate.",
              'Response to Interventions: Future session notes should document the patient\'s response to the interventions used (e.g., "Patient reported finding mindfulness exercises helpful in reducing anxiety"). This demonstrates the effectiveness of treatment.',
              "Level of care: Review documentation to see if a more comprehensive psychiatric diagnostic evaluation may be warranted (90791 or 90792)",
            ],
          },
          { type: "heading", level: 3, content: "Potential Missing Information:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Relevant family history of mental illness.",
              "Current medications (psychiatric and non-psychiatric).",
              "Substance use history.",
              "A more detailed description of the patient's symptoms and their impact on daily functioning.",
              "Assessment of the patient's support system.",
              "Any standardized assessments used (e.g., GAD-7, PHQ-9).",
            ],
          },
          { type: "heading", level: 3, content: "Disclaimer:" },
          {
            type: "paragraph",
            content:
              "The information provided by Validify is for assistance only. It is based on the provided text and current coding/compliance guidelines. All suggestions and assessments must be reviewed and validated by a qualified medical coding professional and/or clinician. Validify's output should not be considered definitive and does not replace the need for professional human judgment.",
          },
        ],
      },
    },
    support4: {
      tabLabel: "Example 4",
      title: "Validify - Nurse Case Use Example",
      before: {
        title: "Clinical Documentation",
        subtitle: "Original (Nurse case use)",
        contentTitle: "Original Clinical Documentation (Nurse case use)",
        content: [
          { type: "paragraph", content: "Patient: Robert Jones, DOB: 07/04/1955. Date: 11/17/2023 Time: 14:00" },
          { type: "paragraph", content: "Shift: Day Shift (07:00-19:00)" },
          { type: "paragraph", content: "Reason for Admission: Pneumonia" },
          { type: "paragraph", content: "Current Complaint: Cough, shortness of breath" },
          { type: "heading", level: 3, content: "Objective:" },
          { type: "paragraph", content: "VS: T 99.8F, HR 102, RR 24, BP 130/80, SpO2 92% on 2L O2 via nasal cannula." },
          { type: "paragraph", content: "Lungs: Coarse crackles auscultated bilaterally." },
          { type: "paragraph", content: "Cough: Productive, thick yellow sputum." },
          { type: "paragraph", content: "Skin: Warm, dry, and intact. No edema." },
          { type: "paragraph", content: "LOC: Alert and oriented x 3" },
          { type: "heading", level: 3, content: "Subjective:" },
          { type: "paragraph", content: 'Patient states, "I\'m having trouble breathing."' },
          { type: "paragraph", content: "Reports pain level of 3/10 in chest with coughing." },
          { type: "heading", level: 3, content: "Intervention:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Administered Oxygen 2L via nasal cannula as ordered.",
              "Assisted with coughing and deep breathing exercises.",
              "Encouraged increased fluid intake.",
              "Administered scheduled medications: Ceftriaxone 1g IV and Azithromycin 500mg PO.",
              "Documented sputum characteristics.",
            ],
          },
          { type: "heading", level: 3, content: "Plan:" },
          {
            type: "list",
            ordered: false,
            items: [
              "Continue to monitor vital signs and respiratory status.",
              "Administer medications as ordered.",
              "Encourage coughing and deep breathing.",
              "Notify MD if increased respiratory distress or change in condition.",
            ],
          },
        ],
      },
      after: {
        title: "Validify Analysis",
        subtitle: "Recommendations",
        contentTitle: "Validify Analysis & Recommendations",
        content: [
          { type: "heading", level: 3, content: "Initial Review:" },
          { type: "paragraph", content: "Patient: Robert Jones, DOB: 07/04/1955\nDate/Time: 11/17/2023 14:00" },
          { type: "heading", level: 3, content: "Potential ICD-10-CM Codes (Supporting Documentation):" },
          { type: "list", ordered: false, items: ["J18.9 Pneumonia, unspecified organism"] },
          {
            type: "heading",
            level: 3,
            content: "Potential CPT/HCPCS Codes (Dependent on Facility Billing Practices):",
          },
          {
            type: "list",
            ordered: false,
            items: [
              "99218-99220 (Initial Hospital Inpatient Care) - If this is an initial assessment upon admission, review documentation to determine appropriate level.",
              "99214-99215 (Subsequent Hospital Inpatient Care) - If this is a subsequent visit.",
              "J7042 (2 Liter Oxygen) - If hospital bills oxygen.",
              "J0696 (Ceftriaxone sodium, per 250 mg) - Based on 1g dose.",
              "J0415 (Azithromycin, oral) - Based on 500mg dose.",
            ],
          },
          { type: "heading", level: 3, content: "Flags & Considerations:" },
          {
            type: "list",
            ordered: false,
            items: [
              'Specificity of Pneumonia: J18.9 is an "unspecified" code. Review physician documentation and lab results (e.g., sputum culture) to determine if a more specific organism can be identified for coding (e.g., Streptococcus pneumoniae, Haemophilus influenzae).',
              "Oxygen Saturation: SpO2 of 92% on 2L is below target for many patients. Monitor closely and document response to oxygen therapy. Note any changes in oxygen requirements.",
              "Pain Assessment: A pain level of 3/10 is reported. Document the characteristics of the pain (e.g., sharp, dull, aching) and any interventions provided for pain relief.",
              "Sputum Color: Yellow sputum suggests possible infection. Ensure sputum culture has been ordered and results are documented. Note any changes in sputum color or consistency.",
              "Medication Administration: Ensure accurate documentation of medication administration, including: Route of Administration: Clearly document the route for each medication (IV for Ceftriaxone, PO for Azithromycin). Site of Injection (for IV medications): Document the location of the IV site. Patient Response: Document the patient's response to the medications (e.g., any adverse reactions or improvement in symptoms).",
              'MD Notification Criteria: The plan includes notifying the MD "if increased respiratory distress or change in condition." Be specific about what constitutes "increased respiratory distress" (e.g., SpO2 < 90% on 2L, increased work of breathing).',
              "Nursing Interventions: Encourage ambulation as tolerated (unless contraindicated) to promote lung expansion and prevent complications. Document ambulation status.",
            ],
          },
          { type: "heading", level: 3, content: "Potential Missing Information:" },
          {
            type: "list",
            ordered: false,
            items: [
              'Allergies and reaction (or "No Known Allergies").',
              "Detailed assessment of cough (frequency, timing).",
              "Assessment of patient's ability to perform coughing and deep breathing exercises effectively.",
              "Dietary intake and tolerance.",
              "Bowel and bladder function.",
              "Review plan of care with patient",
            ],
          },
          { type: "heading", level: 3, content: "Disclaimer:" },
          {
            type: "paragraph",
            content:
              "The information provided by Validify is for assistance only. It is based on the provided text and current coding/compliance guidelines. All suggestions and assessments must be reviewed and validated by a qualified medical coding professional and/or clinician. Validify's output should not be considered definitive and does not replace the need for professional human judgment.",
          },
        ],
      },
    },
  },
}
