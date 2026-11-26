import DrawControls from './components/DrawControls';
import Header from './components/Header';
import ParticipantForm from './components/ParticipantForm';
import ParticipantList from './components/ParticipantList';
import Podium from './components/Podium';
import WinnerAnnouncement from './components/WinnerAnnouncement';
import WinnerCountSelector from './components/WinnerCountSelector';
import { useParticipantDraft } from './hooks/useParticipantDraft';
import { useRaffle } from './hooks/useRaffle';
import type { Random } from './raffle';

interface AppProps {
  random: Random;
}

export default function App({ random }: AppProps) {
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
          winners={raffle.winners}
          onRemove={raffle.remove}
        />
        <WinnerCountSelector value={raffle.winnerCount} onChange={raffle.setWinnerCount} />
        <DrawControls
          canDraw={raffle.canDraw}
          showReset={raffle.participants.length > 0}
          winnerCount={raffle.winnerCount}
          minParticipants={raffle.minParticipants}
          onDraw={raffle.draw}
          onReset={handleReset}
        />
        {raffle.winners.length === 1 && <WinnerAnnouncement winner={raffle.winners[0]} />}
        {raffle.winners.length > 1 && <Podium winners={raffle.winners} />}
      </main>
    </div>
  );
}
