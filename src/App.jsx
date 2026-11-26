import DrawControls from './components/DrawControls.jsx';
import Header from './components/Header.jsx';
import ParticipantForm from './components/ParticipantForm.jsx';
import ParticipantList from './components/ParticipantList.jsx';
import WinnerAnnouncement from './components/WinnerAnnouncement.jsx';
import { useParticipantDraft } from './hooks/useParticipantDraft.js';
import { useRaffle } from './hooks/useRaffle.js';
import { MIN_PARTICIPANTS } from './raffle/index.js';

export default function App({ random }) {
  const raffle = useRaffle(random);
  const draft = useParticipantDraft(raffle.add);

  function handleReset() {
    raffle.reset();
    draft.clear();
  }

  return (
    <div className="min-h-screen bg-linear-160 from-red-50 to-red-100 px-4 py-8 text-gray-800">
      <main className="mx-auto max-w-xl rounded-xl border-t-6 border-red-600 bg-white px-6 py-8 shadow-xl shadow-red-900/10">
        <Header />
        <ParticipantForm
          value={draft.draft}
          error={draft.error}
          onChange={draft.change}
          onSubmit={draft.submit}
        />
        <ParticipantList
          participants={raffle.participants}
          winner={raffle.winner}
          onRemove={raffle.remove}
        />
        <DrawControls
          canDraw={raffle.canDraw}
          showReset={raffle.participants.length > 0}
          minParticipants={MIN_PARTICIPANTS}
          onDraw={raffle.draw}
          onReset={handleReset}
        />
        {raffle.winner && <WinnerAnnouncement winner={raffle.winner} />}
      </main>
    </div>
  );
}
