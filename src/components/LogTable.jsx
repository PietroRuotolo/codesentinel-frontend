import { useState, useEffect, Fragment } from "react";

function LogTable (){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [level, setLevel] = useState("");
    const [message, setMessage] = useState("");
    const [after, setAfter] = useState(null);
    const [before, setBefore] = useState(null);
    const [diagnoses, setDiagnoses] = useState({});
    const [loadingId, setLoadingId] = useState(null);

    const handleDiagnose = (log) => {
    setLoadingId(log.id);
        fetch(`${import.meta.env.VITE_API_URL}/diagnose`, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: log.message,
        })
            .then((response) => response.text())
            .then((texto) => {
                setDiagnoses((prev) => ({ ...prev, [log.id]: texto }));
                setLoadingId(null);
            })
            .catch((error) => {
                console.error(error);
                setDiagnoses((prev) => ({
                    ...prev,
                    [log.id]: "Failed to get diagnosis. Please try again.",
                }));
                setLoadingId(null);
            });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() =>{
            const params = new URLSearchParams();
            if(level) params.append("level", level);
            if(message) params.append("message", message);
            if(after) params.append("after", after);
            if(before) params.append("before", before);
                fetch(`${import.meta.env.VITE_API_URL}/logs?${params.toString()}`)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                    setIsLoading(false);
                }).catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });
        },400);
        return () => clearTimeout(timeoutId);
    },[level, message, after, before]);

    if(isLoading) return(
        <p className="text-center text-slate-500 py-8 text-lg"> 
            Loading...
        </p>
    ) 
    

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center gap-4">
                <label htmlFor="level-filter" className="text-sm font-medium text-slate-700">
                    Filter by level:
                </label>
                <select
                    id="level-filter"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 cursor-pointer"
                >
                    <option value="">All</option>
                    <option value="DEBUG">DEBUG</option>
                    <option value="INFO">INFO</option>
                    <option value="WARN">WARN</option>
                    <option value="ERROR">ERROR</option>
                </select>

                <label htmlFor="message-filter" className="text-sm font-medium text-slate-700">
                    Filter by message:
                </label>
                <input
                    id="message-filter"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Search messages..."
                    className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                />

                <label htmlFor="after-filter" className="text-sm font-medium text-slate-700">
                    From:
                </label>
                <input
                    id="after-filter"
                    type="date"
                    value={after ?? ""}
                    onChange={(e) => setAfter(e.target.value || null)}
                    max= "2026-12-31"
                    min= "2025-12-31"
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                />

                <label htmlFor="before-filter" className="text-sm font-medium text-slate-700">
                    To:
                </label>
                <input
                    id="before-filter"
                    type="date"
                    value={before ?? ""}
                    onChange={(e) => setBefore(e.target.value || null)}
                    max= "2026-12-31"
                    min= "2025-12-31"
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm"> 
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">ID</th>
                            <th className="px-4 py-3 text-left font-semibold">Level</th>
                            <th className="px-4 py-3 text-left font-semibold">Date</th>
                            <th className="px-4 py-3 text-left font-semibold">Message</th>
                            <th className="px-4 py-3 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((log) => (
                            <Fragment key={log.id}>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3 text-slate-500">{log.id}</td>
                                    <td className="px-4 py-3">
                                        <span className={levelBadge(log.level)}>
                                            {log.level}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                                        {new Date(log.logDate).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-slate-800">{log.message}</td>
                                    <td className="px-4 py-3">
                                        {log.level === 'ERROR' && (
                                            <button
                                                type="button"
                                                onClick={() => handleDiagnose(log)}
                                                disabled={loadingId === log.id}
                                                className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {loadingId === log.id ? "Diagnosing..." : "Diagnose"}
                                            </button>
                                        )}
                                      
                                    </td>
                                </tr>
                                {diagnoses[log.id] && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-3 bg-slate-50 text-slate-700">
                                            {diagnoses[log.id]}
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function levelBadge(level) {
    const base = "inline-block px-2 py-1 rounded text-xs font-medium ";
    switch (level) {
        case "ERROR": return base + "bg-red-100 text-red-700";
        case "WARN":  return base + "bg-amber-100 text-amber-700";
        case "INFO":  return base + "bg-blue-100 text-blue-700";
        case "DEBUG": return base + "bg-slate-100 text-slate-600";
        default:      return base + "bg-slate-100 text-slate-600";
    }
}

export default LogTable