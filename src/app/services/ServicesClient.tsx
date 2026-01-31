'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import { useSalespersons } from '@/hooks/useSalespersons'
import TeamModal from '@/components/TeamModal'
import SalespersonModal from '@/components/SalespersonModal'
import { Salesperson } from '@/lib/firestore-models'

export default function ServicesClient() {
  const { salespersons } = useSalespersons()

  const [teamOpen, setTeamOpen] = useState(false)
  const [personOpen, setPersonOpen] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<Salesperson | null>(null)

  const activeSorted = useMemo(() => {
    return (salespersons || [])
      .filter(p => p?.isActive)
      .sort((a, b) => Number(a.order ?? 9999) - Number(b.order ?? 9999))
  }, [salespersons])

  const handleSelectPerson = (p: Salesperson) => {
    setSelectedPerson(p)
    setPersonOpen(true)
    setTeamOpen(false)
  }

  return (
    <main className="overflow-x-hidden bg-white">

      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden bg-gray-950 text-white">
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dlesei0kn/image/upload/file_00000000fa887209b3d7cd4ca3059587_dxbu8m.png"
        />

        <div
          className="absolute inset-0 bg-right bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dlesei0kn/image/upload/file_00000000fa887209b3d7cd4ca3059587_dxbu8m.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_18%_35%,rgba(0,113,227,0.35),transparent_65%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36 lg:py-44">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Laptop sales,<br />repairs & IT services
            </h1>

            <p className="mt-8 text-lg text-white/75 leading-relaxed max-w-2xl">
              Transparent laptop sales, professional diagnostics, upgrades,
              and long-term IT support — delivered from our physical showroom
              in Srinagar. We explain first. You decide.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="https://maps.app.goo.gl/2A7278B8rGM1z23h7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-100 transition shadow-lg"
              >
                Get directions →
              </a>

              <Link
                href="/team"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition"
              >
                Meet our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICE OVERVIEW ================= */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-3xl lg:text-4xl font-extrabold">
              What we actually do
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              Practical, in-store services designed around real usage — not upselling.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Laptop Sales', desc: 'Verified laptops with clarity.' },
              { title: 'Diagnostics & Repair', desc: 'Faults explained before repair.' },
              { title: 'Upgrades', desc: 'Performance-focused improvements.' },
              { title: 'IT Support', desc: 'Long-term professional support.' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border p-8 hover:shadow-lg transition"
              >
                <div className="h-1 w-12 bg-blue-600 mb-6 rounded-full" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 lg:py-32 px-6 bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Need help with a laptop?
          </h2>

          <p className="text-lg text-white/70 mb-10">
            Visit our Srinagar showroom or talk to an expert before deciding.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setTeamOpen(true)}
              className="inline-flex items-center justify-center px-10 py-4 rounded-full
                         bg-white text-gray-900 font-bold hover:bg-gray-100 transition"
            >
              Connect with our team
            </button>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full
                         border border-white/30 text-white font-bold hover:bg-white/10 transition"
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </section>

      {/* ================= MODALS ================= */}
      <TeamModal
        isOpen={teamOpen}
        onClose={() => setTeamOpen(false)}
        title="Connect with Our Team"
        subtitle="Choose a specialist and connect instantly via call or WhatsApp."
        salespersons={activeSorted}
        showViewAllLink
        onSelectPerson={handleSelectPerson}
        viewAllHref="/team"
      />

      <SalespersonModal
        isOpen={personOpen}
        salesperson={selectedPerson}
        onClose={() => setPersonOpen(false)}
      />

    </main>
  )
}
