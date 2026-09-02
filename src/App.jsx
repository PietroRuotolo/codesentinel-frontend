import LogTable from './components/LogTable'

export const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">CodeSentinel</h1>
        <LogTable />
      </div>
    </div>
  )
}

export default App
