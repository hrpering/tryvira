import { vira } from "./_client.mjs";
const quality=await vira.evaluateQuality({request:"Build a full-funnel launch plan with measurement",candidates:[{id:"initial",output:"Focus on acquisition with paid media."},{id:"repair",output:"Cover awareness, consideration, conversion and retention; attach an objective and measurement approach to each stage."}],allowedIds:["initial","repair"],requiredTerms:["retention","measurement"],threshold:0.7});
console.log(JSON.stringify(quality?.body,null,2));
