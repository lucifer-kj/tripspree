import { runOrchestrateTurn } from './src/orchestrator/workflow.js';

async function main() {
  console.log('--- TEST 1: Normal Query (Itinerary) ---');
  const res1 = await runOrchestrateTurn({
    callId: 'call_test_1',
    transcript: 'What is my schedule for today?',
  });
  console.log('Result 1:', JSON.stringify(res1, null, 2));

  console.log('\n--- TEST 2: Safety Distress ---');
  const res2 = await runOrchestrateTurn({
    callId: 'call_test_2',
    transcript: 'I need an ambulance immediately, someone is hurt',
  });
  console.log('Result 2:', JSON.stringify(res2, null, 2));

  console.log('\n--- TEST 3: Human / Manager Escalation ---');
  const res3 = await runOrchestrateTurn({
    callId: 'call_test_3',
    transcript: 'Let me speak to a manager please',
  });
  console.log('Result 3:', JSON.stringify(res3, null, 2));

  console.log('\n--- TEST 4: Abuse Warning 1 & Termination ---');
  const res4a = await runOrchestrateTurn({
    callId: 'call_test_abuse',
    transcript: 'You are a useless bot, shut up',
  });
  console.log('Result 4a (Warning 1):', JSON.stringify(res4a, null, 2));

  const res4b = await runOrchestrateTurn({
    callId: 'call_test_abuse',
    transcript: 'Fuck you idiot',
  });
  console.log('Result 4b (Warning 2 / Terminate):', JSON.stringify(res4b, null, 2));

  console.log('\n--- ALL DECISION TREE TESTS COMPLETED ---');
}

main().catch(console.error);
