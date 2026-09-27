// // ============================================================
// // MarketOverview.tsx — Market Ticker + Market Pulse (all-in-one)
// // ============================================================

// type Stock = {
//   label: string;
//   price: string;
//   change: string;
//   positive: boolean;
// };

// type Mover = {
//   ticker: string;
//   price: string;
//   change: string;
//   positive: boolean;
// };

// const tickerStocks: Stock[] = [
//   { label: "BANK", price: "1,511.16", change: "+1.59%", positive: true },
//   { label: "HYDRO", price: "3,665.08", change: "+0.85%", positive: true },
//   { label: "HOTELS", price: "7,210.19", change: "+0.33%", positive: true },
//   { label: "FINANCE", price: "2,267.53", change: "-0.02%", positive: false },
//   { label: "HATHY", price: "499.8", change: "-1.5%", positive: false },
//   { label: "SBL", price: "447.9", change: "+0.3%", positive: true },
// ];

// const heroStats = [
//   { value: "2,647", label: "NEPSE Index" },
//   { value: "NPR 9.1B", label: "Turnover" },
//   { value: "345", label: "Traded Stocks" },
// ];

// const movers: Mover[] = [
//   { ticker: "SNORL", price: "1,057.00", change: "+13.66%", positive: true },
//   { ticker: "ILBS", price: "1,065.00", change: "+9.81%", positive: true },
//   { ticker: "IGIPO", price: "241.00", change: "+9.05%", positive: true },
//   { ticker: "HATHY", price: "499.80", change: "-15.00%", positive: false },
// ];

// // ---------- shared icons ----------

// function ArrowUp() {
//   return (
//     <svg viewBox="0 0 15 15" className="h-[15px] w-[15px] shrink-0">
//       <path d="M7.5 1.5L14 12.5H1L7.5 1.5Z" fill="#0aa852" />
//     </svg>
//   );
// }

// function ArrowDown() {
//   return (
//     <svg viewBox="0 0 15 15" className="h-[15px] w-[15px] shrink-0">
//       <path d="M7.5 13.5L1 2.5H14L7.5 13.5Z" fill="#e31b1b" />
//     </svg>
//   );
// }

// function ArrowRight() {
//   return (
//     <svg viewBox="0 0 15 15" className="h-[15px] w-[15px] shrink-0">
//       <path
//         d="M3 12L12 3M12 3H5M12 3V10"
//         stroke="white"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         fill="none"
//       />
//     </svg>
//   );
// }

// function MoverArrow({ positive }: { positive: boolean }) {
//   return (
//     <svg
//       viewBox="0 0 10 10"
//       className={`h-2.5 w-2.5 shrink-0 ${positive ? "" : "-scale-y-100"}`}
//     >
//       <path
//         d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7"
//         stroke={positive ? "#0aa852" : "#e31b1b"}
//         strokeWidth="1.2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         fill="none"
//       />
//     </svg>
//   );
// }

// // ---------- Market Ticker ----------

// function StockItem({ stock }: { stock: Stock }) {
//   return (
//     <div className="flex shrink-0 items-end gap-[5px]">
//       <p className="whitespace-nowrap font-['Space_Grotesk'] text-base tracking-[1.28px]">
//         <span className="font-normal text-[#656565]">{stock.label} </span>
//         <span className="font-bold text-black">{stock.price}</span>
//       </p>
//       {stock.positive ? <ArrowUp /> : <ArrowDown />}
//       <p
//         className={`whitespace-nowrap font-['Space_Grotesk'] text-base font-bold tracking-[1.28px] ${
//           stock.positive ? "text-[#0aa852]" : "text-[#e31b1b]"
//         }`}
//       >
//         {stock.change}
//       </p>
//     </div>
//   );
// }

// function MarketTicker() {
//   const items = [...tickerStocks, ...tickerStocks];

//   return (
//     <div className="mx-6 mt-12 rounded-[30px] border border-[#d5d5d5] bg-gradient-to-r from-[#edfaf2] to-white px-7 py-4 shadow-[0px_1px_14.4px_0px_rgba(0,0,0,0.15)] md:mx-[104px] md:mt-16">
//       <div className="mb-5 flex items-center justify-between">
//         <div className="flex items-center gap-2.5">
//           <span className="h-2 w-2 rounded-full bg-[#0aa852]" />
//           <p className="font-['Space_Grotesk'] text-sm font-normal tracking-[1.12px] text-[#5a5a5a]">
//             MARKET CLOSED - NEPSE
//           </p>
//         </div>
//         <div className="flex items-center gap-[5px]">
//           <p className="font-['Space_Grotesk'] text-sm font-medium tracking-[1.12px] text-black">
//             2,647.22
//           </p>
//           <ArrowUp />
//           <p className="font-['Space_Grotesk'] text-sm font-medium tracking-[1.12px] text-[#0aa852]">
//             +0.87%
//           </p>
//         </div>
//       </div>

//       <div className="overflow-hidden">
//         <div className="flex w-max animate-marquee items-end gap-[30px]">
//           {items.map((stock, i) => (
//             <StockItem key={i} stock={stock} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ---------- Market Pulse: left card ----------

// function MarketPulseCard() {
//   return (
//     <div className="flex h-full flex-col items-start rounded-[30px] bg-[#fbfbfb] pb-[45px] pl-6 pr-8 pt-[30px]">
//       <div className="flex w-full flex-col gap-6">
//         <div className="flex h-7 w-fit items-center gap-[7px] rounded-[30px] border-[0.5px] border-[#0aa852] bg-[#dcffec] px-2.5 py-1.5">
//           <span className="h-2 w-2 shrink-0 rounded-full bg-[#0aa852]" />
//           <p className="whitespace-nowrap font-['Space_Grotesk'] text-xs font-medium tracking-[0.6px] text-[#0aa852]">
//             NEPAL&rsquo;S FINANCIAL PULSE
//           </p>
//         </div>

//         <h1 className="font-serif text-[42px] font-bold leading-[1.15] text-black md:text-[50px]">
//           The market, <span className="text-[#0aa852]">decoded</span> —
//           <br />
//           clearly, every single day.
//         </h1>

//         <p className="max-w-[520px] font-sans text-[15px] font-normal leading-relaxed text-[#474747]">
//           Live NEPSE data, sharp Nepali analysis, and the news that move your
//           portfolio — in one calm, trustworthy place for investors.
//         </p>

//         <div className="flex items-center gap-[15px]">
//           <button className="flex h-[38px] items-center gap-[7px] rounded-xl bg-[#0aa852] pl-[11px] pr-[10px] text-xs font-medium text-white">
//             Open market overview
//             <ArrowRight />
//           </button>
//           <button className="flex h-[38px] items-center justify-center rounded-xl border-[0.5px] border-[#0aa852] bg-white px-[18px] text-xs font-medium text-[#0aa852]">
//             Why Share Rocket
//           </button>
//         </div>

//         <hr className="w-full border-t border-[#d5d5d5]" />

//         <div className="flex items-center gap-16">
//           {heroStats.map((stat) => (
//             <div key={stat.label} className="flex flex-col gap-1">
//               <p className="font-['Space_Grotesk'] text-[28px] font-medium text-black">
//                 {stat.value}
//               </p>
//               <p className="font-['Space_Grotesk'] text-xs font-normal text-[#535353]">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ---------- Market Pulse: right card ----------

// function IndexChart() {
//   return (
//     <svg viewBox="0 0 426 90" className="h-full w-full" preserveAspectRatio="none">
//       {[0, 30, 60, 90].map((y) => (
//         <line key={y} x1="0" y1={y} x2="426" y2={y} stroke="#d9e8dd" strokeWidth="1" />
//       ))}
//       <polyline
//         points="0,80 30,72 55,55 80,62 105,50 130,52 155,44 180,48 205,32 230,38 255,26 280,30 305,18 330,20 355,12 380,15 405,10 426,12"
//         fill="none"
//         stroke="#0aa852"
//         strokeWidth="2.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function NepseIndexCard() {
//   return (
//     <div className="flex h-full flex-col items-start rounded-[30px] bg-[#fbfbfb] px-6 pb-9 pt-[30px]">
//       <div className="flex w-full flex-col gap-[31px]">
//         <div className="flex w-full flex-col gap-[17px]">
//           <div className="flex w-full items-center justify-between">
//             <div className="flex flex-col gap-px">
//               <p className="font-['Space_Grotesk'] text-[15px] font-normal tracking-[0.75px] text-[#535353]">
//                 NEPSE Index
//               </p>
//               <p className="font-['Space_Grotesk'] text-[32px] font-bold text-black">
//                 2,647.22
//               </p>
//             </div>
//             <div className="flex h-[27px] items-center gap-1 rounded-[10px] border-[0.5px] border-[#ececec] bg-[#dcffec] px-2.5">
//               <MoverArrow positive />
//               <p className="whitespace-nowrap font-['Space_Grotesk'] text-xs font-bold text-[#0aa852]">
//                 +22.85
//               </p>
//             </div>
//           </div>

//           <div className="h-[154px] w-full rounded-2xl bg-[#edf8f0] px-[18px] py-8">
//             <IndexChart />
//           </div>
//         </div>

//         <div className="flex w-full flex-col gap-[11px]">
//           {movers.map((m) => (
//             <div
//               key={m.ticker}
//               className="flex h-[31px] w-full items-center justify-between rounded-[10px] bg-[rgba(237,248,240,0.69)] px-[15px]"
//             >
//               <p className="font-['Space_Grotesk'] text-[15px] font-medium text-black">
//                 {m.ticker}
//               </p>
//               <div className="flex items-center gap-[15px]">
//                 <p className="font-['Space_Grotesk'] text-xs font-light tracking-[0.6px] text-[#393838]">
//                   {m.price}
//                 </p>
//                 <div className="flex items-center gap-[5px]">
//                   <MoverArrow positive={m.positive} />
//                   <p
//                     className={`font-['Space_Grotesk'] text-xs font-medium ${
//                       m.positive ? "text-[#0aa852]" : "text-[#e31b1b]"
//                     }`}
//                   >
//                     {m.change}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ---------- Exported page section (everything together) ----------

// export default function MarketOverview() {
//   return (
//     <>
//       <MarketTicker />
//       <section className="mx-6 mt-8 flex flex-col gap-8 md:mx-[104px] md:flex-row">
//         <div className="md:basis-[58%]">
//           <MarketPulseCard />
//         </div>
//         <div className="md:basis-[42%]">
//           <NepseIndexCard />
//         </div>
//       </section>
//     </>
//   );
// }