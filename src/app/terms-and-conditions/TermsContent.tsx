import Link from 'next/link';

const sectionClass = 'scroll-mt-28';
const h2Class =
  'text-2xl md:text-[1.65rem] font-serif font-bold text-dark border-l-4 border-primary pl-4 mb-4 mt-12 first:mt-0';
const h3Class = 'text-lg font-semibold text-dark mt-6 mb-3';
const pClass = 'text-gray-700 leading-relaxed mb-4';
const ulClass = 'list-disc pl-6 space-y-2 text-gray-700 mb-4';
const tocItems: { id: string; label: string }[] = [
  { id: 'reservation-deposit', label: 'Reservation & Deposit' },
  { id: 'receipt-booking', label: 'Receipt of Booking Form & Deposit' },
  { id: 'finalisation-passport', label: 'Booking Finalisation & Passport' },
  { id: 'balance-payment', label: 'Balance of Payment' },
  { id: 'late-booking', label: 'Late Booking Fees' },
  { id: 'late-payment', label: 'Late Payment Fees' },
  { id: 'amendment-fees', label: 'Amendment & Administration' },
  { id: 'cancellation-customer', label: 'Cancellation by Customer' },
  { id: 'cancellation-cts', label: 'Cancellation by CTS Tours' },
  { id: 'fees-charges', label: 'Fees & Charges' },
  { id: 'invoicing', label: 'Invoicing Errors' },
  { id: 'agents', label: 'Agent Responsibilities' },
  { id: 'visa', label: 'Visa Requirements' },
  { id: 'insurance', label: 'Travel Insurance' },
  { id: 'health', label: 'Health Requirements' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'airlines', label: 'Airlines' },
  { id: 'transfers', label: 'Transfers' },
  { id: 'cruise', label: 'Cruise Packages' },
  { id: 'baggage', label: 'Baggage' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'tipping', label: 'Tipping' },
  { id: 'smoking', label: 'Smoking' },
  { id: 'minors', label: 'Travel With Minors' },
  { id: 'single', label: 'Single Travellers' },
  { id: 'triple', label: 'Triple Share' },
  { id: 'special-assistance', label: 'Special Assistance' },
  { id: 'special-requests', label: 'Special Requests' },
  { id: 'breakaway', label: 'Breakaway Policy' },
  { id: 'responsibility', label: 'Responsibility' },
  { id: 'exclusions', label: 'Exclusions' },
  { id: 'cga', label: 'Consumer Guarantees Act' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'refusal-carriage', label: 'Refusal of Carriage' },
  { id: 'refusal-service', label: 'Refusal of Service' },
  { id: 'hotel-media', label: 'Hotel Descriptions & Media' },
  { id: 'travel-docs', label: 'Travel Documentation' },
  { id: 'complaints', label: 'Complaints & Claims' },
  { id: 'lost-property', label: 'Lost Property' },
  { id: 'testimonials', label: 'Testimonials' },
];

export function TermsTableOfContents() {
  return (
    <nav
      aria-label="On this page"
      className="rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm lg:sticky lg:top-28"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">On this page</p>
      <ul className="max-h-[min(70vh,520px)] overflow-y-auto space-y-1.5 text-sm pr-1">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block rounded-md px-2 py-1 text-gray-600 transition-colors hover:bg-light hover:text-primary"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function TermsArticle() {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/40 md:p-10 lg:p-12">
      <p className={`${pClass} text-lg text-gray-800 border-b border-warm-200 pb-6`}>
        It is important that you read and understand the following terms and conditions before making your booking.
      </p>

      <section id="reservation-deposit" className={sectionClass}>
        <h2 className={h2Class}>Reservation & Deposit</h2>
        <h3 className={h3Class}>For bookings made directly through CTS Tours</h3>
        <p className={pClass}>
          Please submit a Booking Form along with a deposit. A non-refundable deposit of $1,000 per person is required
          to confirm your booking. Pay the deposit within 3 working days of reservation.
        </p>
        <p className={pClass}>
          Your booking is not confirmed until CTS Tours has received the deposit. If the deposit is late, we may cancel
          the booking. Late fees in this document may apply.
        </p>
        <p className={pClass}>
          If the total booking cost is below $1,000 per person, full payment is due at the time of booking.
        </p>
        <h3 className={h3Class}>For vouchers purchased through a third party vendor</h3>
        <p className={pClass}>
          The purchase of vouchers does not automatically guarantee availability of a given departure date. You must
          complete and submit a CTS Booking Form along with a copy of each traveller&apos;s passport photo page to
          secure your dates.
        </p>
        <p className={pClass}>
          CTS Tours may correct errors in rates quoted or calculated, or omissions, at any time during booking and
          invoicing.
        </p>
        <p className={pClass}>
          A verbal quote is a guide only. The final price is confirmed in writing.
        </p>
      </section>

      <section id="receipt-booking" className={sectionClass}>
        <h2 className={h2Class}>Receipt of Booking Form & Deposit</h2>
        <p className={pClass}>
          Receipt of a Booking Form or Deposit by CTS Tours is treated as an undertaking that the customer or agent has
          read and agrees to be bound by all terms and conditions set forth in this document.
        </p>
      </section>

      <section id="finalisation-passport" className={sectionClass}>
        <h2 className={h2Class}>Booking Finalisation and Passport Copies</h2>
        <p className={pClass}>
          All booking components must be finalised within 30 days of booking, or 90 days before departure, whichever
          comes first. This includes dates, extensions, optional programmes, stopovers, early arrivals, stay behinds,
          upgrades, and passport copies.
        </p>
        <p className={pClass}>Changes after that date may incur penalties set out in this document.</p>
        <p className={pClass}>
          You must provide passport copies (valid or expired) at booking. Names must match a valid passport in full.
        </p>
        <p className={pClass}>
          If we do not receive passport copies by the same deadline (30 days after booking or 90 days before departure,
          whichever is first), travel documents will use the names on the booking form. CTS Tours is not liable for
          costs from name corrections. Fees apply to reissue travel documents.
        </p>
        <p className={pClass}>
          We issue documentation close to departure as set out under Travel Documentation. A surcharge from $100 per
          person applies if you ask for travel documents (such as air tickets) earlier than that schedule.
        </p>
      </section>

      <section id="balance-payment" className={sectionClass}>
        <h2 className={h2Class}>Balance of Payment</h2>
        <p className={pClass}>
          For China, Japan, South Korea, Vietnam, Europe, Australia, and New Zealand: if the itinerary is under 15 days
          and does not include an ocean cruise, the final balance is due 90 days before departure.
        </p>
        <p className={pClass}>
          If the package includes an ocean cruise, lasts 15 days or longer, or is not listed above, the final balance is
          due 120 days before departure.
        </p>
        <p className={pClass}>
          Payments by credit card incur a non-refundable processing fee. Accepted credit cards are Visa and MasterCard
          (3% processing fee — confirm at booking) and American Express (4% processing fee). CTS Tours will confirm the
          applicable rate at the time of booking.
        </p>
        <p className={pClass}>
          Payments by internet banking or direct deposit must include reference of the invoice number, and a copy of the
          remittance advice must be emailed to CTS Tours. When making payments, please allow a minimum bank processing time
          of 2 working days. Documents will not be dispatched until all funds have cleared. Late payments are subject to
          Late Payment Fees set forth in this document and possible cancellation of your booking.
        </p>
      </section>

      <section id="late-booking" className={sectionClass}>
        <h2 className={h2Class}>Late Booking Fees</h2>
        <p className={pClass}>
          Bookings made within 60 days of the departure date incur a late booking fee from $100 per person, and the
          booking must be paid in full immediately. Bookings made less than 90 days prior to departure must be
          deposited immediately and the balance must be paid in full within 7 working days of reservation.
        </p>
        <p className={pClass}>
          Late booking fees also apply for late submission of the CTS Tours booking form after the purchase of vouchers
          through a third party vendor.
        </p>
      </section>

      <section id="late-payment" className={sectionClass}>
        <h2 className={h2Class}>Late Payment Fees</h2>
        <p className={pClass}>
          Bookings where deposits and final balances are not paid on time are subject to possible cancellation and incur
          the following late payment fees:
        </p>
        <ul className={ulClass}>
          <li>Late payment after initial payment deadline: from $50 per person</li>
          <li>Late payment within 30 days after initial payment deadline: from $100 per person</li>
          <li>Late payment within 60 days after initial payment deadline: from $150 per person</li>
        </ul>
        <p className={pClass}>
          CTS Tours must be promptly informed of all payments. Late payment fees apply to payments that are not properly
          accounted for due to reasons such as failing to provide remittance advice, not allowing enough bank processing
          or clearance time, payments without reference of invoice or booking number, and payments to the wrong account,
          etc. CTS Tours reserves the right to cancel any booking where payment is not received within specified
          deadlines.
        </p>
      </section>

      <section id="amendment-fees" className={sectionClass}>
        <h2 className={h2Class}>Amendment & Administration Fees</h2>
        <p className={pClass}>
          All booking variations made 30 days or more after booking, or 90 days before departure, whichever comes first —
          including transferring between tour packages and departure dates — incur an amendment fee from $100 per person
          per change, payable at the time of the change (other fees may apply). Bookings requiring reissue of air tickets
          and other documents will incur an additional administration fee from $150 per person.
        </p>
        <p className={pClass}>
          All fees associated with amendments to default group itineraries or set arrangements — such as airline
          upgrades, stopovers, self-arranged stay behinds and any breakaways from the group — are payable immediately at
          the time of the change.
        </p>
        <p className={pClass}>
          Changes must be made in writing by the person who made the original booking, or their travel agent. Once a
          booking is confirmed, name transfers are not permitted and will be regarded as a cancellation.
        </p>
      </section>

      <section id="cancellation-customer" className={sectionClass}>
        <h2 className={h2Class}>Cancellation by Customer</h2>
        <p className={pClass}>
          All cancellations must be made in writing to CTS Tours and will be subject to the following cancellation
          charges from the date the written cancellation is received:
        </p>
        <h3 className={h3Class}>For bookings made directly through CTS Tours</h3>
        <ul className={ulClass}>
          <li>90 days or more prior to departure: loss of deposit plus administration fees plus the cost of air and cruise tickets.</li>
          <li>89–61 days prior to departure: loss of deposit and 50% of total booking cost plus the cost of air and cruise tickets.</li>
          <li>60–31 days prior to departure: loss of deposit and 75% of total booking cost plus the cost of air and cruise tickets.</li>
          <li>30 days or less prior to departure: loss of deposit and 100% of total booking cost plus the cost of air and cruise tickets.</li>
        </ul>
        <h3 className={h3Class}>For vouchers purchased through a third party vendor</h3>
        <p className={pClass}>
          Vouchers are 100% non-refundable at all times and are subject to the booking conditions of the third party
          vendor.
        </p>
        <p className={pClass}>
          For cancellations involving air and cruise tickets already issued at the time of cancellation, the cost of the
          tickets is non-refundable and is in addition to the cancellation fees already outlined above.
        </p>
        <p className={pClass}>
          In the event of any partial or complete no show of the tour, flights or any other booking components, the
          booking shall be treated as a cancellation whereby the deposit and total booking cost are fully non-refundable.
          No show fees may be collected by the supplier. For bookings wherein components are partially paid both directly
          to CTS Tours and via a third party vendor, the most restrictive terms and conditions prevail.
        </p>
        <p className={pClass}>
          In the event of a cancellation, any refunds will be less administration fees including visa, transfer fees,
          airline cancellation fees, credit card processing fees and any applicable amendment fees. Cancellation
          charges and fees cannot be waived. There can be no exceptions. No refund will be made for any unused portions of
          the holiday after the departure date. A single supplement is payable for any cancellations whereby the
          remaining occupant(s) require single room(s). Please note that employees of any overseas company or staff of CTS
          Tours outside New Zealand are not authorised to provide any guarantees or agreements to customers in respect of
          refunds or any other matters.
        </p>
      </section>

      <section id="cancellation-cts" className={sectionClass}>
        <h2 className={h2Class}>Cancellation by CTS Tours</h2>
        <p className={pClass}>
          CTS Tours reserves the right to cancel or vary a tour prior to departure due to insufficient numbers. In such an
          event, alternative guaranteed travel dates will be offered. Should these options not be acceptable, CTS Tours
          will refund the full price paid, less visa cost. If a tour is cancelled due to unforeseeable circumstances such
          as, but not restricted to, severe weather conditions or force majeure, CTS Tours will refund all monies except
          visa costs, credit card processing fees and any cancellation fees levied by airlines and other third parties.
        </p>
        <p className={pClass}>
          Unforeseeable circumstances such as force majeure, adverse weather, flight rescheduling, hotel overbooking and
          faults with transportation or road conditions may also affect the tour itinerary after the commencement date.
          Any decision made in respect of tour services by independent operators to re-route or amend the itinerary due
          to any of the above or similar circumstances is at the discretion of the tour service provider and CTS Tours
          shall not be liable for any claim arising from such events.
        </p>
      </section>

      <section id="fees-charges" className={sectionClass}>
        <h2 className={h2Class}>Fees & Charges</h2>
        <p className={pClass}>
          All fully inclusive prices indicated in our materials are based on group travel, and any additional arrangements
          from the set itinerary, such as early arrival, stay behind, stopover or routing deviations, may incur additional
          costs (see Breakaway Policy). Arrangements such as transfers, accommodation etc outside the set group
          arrangements or dates are at additional cost and are not covered by the Breakaway Fee.
        </p>
        <p className={pClass}>
          All participants must strictly stay with the group according to the fixed itinerary from beginning to end.
          Participants are not authorised to leave the group or forfeit any day(s) or activities at any stage, unless prior
          consent is provided in writing by CTS Tours. Any unauthorised deviation is subject to penalties from $100 per
          person per day and CTS Tours shall not be responsible for any act or mishap thereafter.
        </p>
        <p className={pClass}>
          No show of any flight sectors or tour arrangements is strictly not permitted. Failure to show up or check in on
          time will result in the automatic cancellation of all onward flights or arrangements, and the travel document
          will be rendered void and fully non-refundable. No show penalties may be collected by the supplier. Any
          penalties and costs associated with rebooking flights and other arrangements shall be borne by the passenger.
          There shall be no refund for any unused services.
        </p>
      </section>

      <section id="invoicing" className={sectionClass}>
        <h2 className={h2Class}>Invoicing Errors</h2>
        <p className={pClass}>
          Customers are responsible for checking the booking and invoice thoroughly and contacting CTS Tours or their
          travel agent immediately if the invoice appears to be incorrect or incomplete. CTS Tours cannot accept
          responsibility if not notified of invoice inaccuracies within 3 days of invoicing. CTS Tours reserves the right
          to collect any omissions or underbilled charges from verbal or written quotations and invoices, and reserves the
          right to adjust or reissue invoices to reflect correct pricing.
        </p>
      </section>

      <section id="agents" className={sectionClass}>
        <h2 className={h2Class}>Agent Responsibilities</h2>
        <p className={pClass}>
          It is the travel agent&apos;s responsibility to ensure that all invoice and itinerary details and documentation
          issued by CTS Tours are correct at the time of booking and that the customer is aware of amendment and
          cancellation conditions and other clauses stipulated in the Booking Conditions. Travel agents must provide all
          passport copies at the time of booking. Any amendment, administration, cancellation and associated booking fees
          incurred due to agent or customer error shall be billed to the agent. Any errors must be advised to CTS Tours
          immediately. CTS Tours cannot accept responsibility if not notified of invoice or booking inaccuracies within
          3 days of invoicing. CTS Tours reserves the right to reissue invoices with correct pricing.
        </p>
      </section>

      <section id="visa" className={sectionClass}>
        <h2 className={h2Class}>Visa Requirements</h2>
        <p className={pClass}>
          A passport with a minimum of six months validity from the date of return is required for customers travelling to
          all countries in our programme. It is recommended that travellers have at least three blank pages in their
          passport. Visa costs are not included in tour packages unless otherwise explicitly stated. If passports are not
          physically received by CTS Tours 30 days prior to departure, the customer may be required to pay an urgent visa
          processing fee. Unless otherwise requested, your passport will be returned with final documentation
          approximately two weeks prior to your departure date. Responsibility for documentation accuracy, passport
          validity and dispatch of documents rests with the customer. CTS Tours accepts no responsibility for any failure
          in this respect. CTS Tours does not issue foreign visas. CTS Tours cannot guarantee that any visa will be issued
          by the relevant authority and accepts no responsibility if a visa application is refused. Any cancellation fees
          or other expenses incurred by the customer due to the refusal of a visa will entirely be the customer&apos;s
          liability.
        </p>
        <p className={pClass}>
          The following summary of visa requirements for New Zealand passport holders is a guide only and subject to
          change. CTS Tours is only able to arrange visas on behalf of applicants who are present in New Zealand at the
          time of application; service fee at $200 per visa. All customers are responsible for checking visa requirements
          with their local embassy or consulate.
        </p>
        <h3 className={h3Class}>Visa-Free Entry to China</h3>
        <p className={pClass}>
          New Zealand ordinary passport holders may enter China visa-free for stays of up to 30 days for purposes of
          tourism, business, visiting family and friends, exchange and transit. This policy currently extends to 31
          December 2026 and is subject to change by official government announcement. Passport holders of other
          nationalities should verify current visa requirements independently with the relevant Chinese embassy or
          consulate before travel.
        </p>
        <p className={pClass}>
          Visa-free entry is available through all sea, land and air ports open to foreign nationals (except where laws,
          regulations or bilateral arrangements specify otherwise). Visa-free entry does not apply to those travelling for
          work, study or journalism purposes. Multiple entries are permitted with no current restriction on the number
          of entries or total days of stay, provided each stay does not exceed 30 consecutive days.
        </p>
        <p className={pClass}>
          It is strongly recommended that travellers carry supporting documents such as a return flight itinerary,
          accommodation confirmation and any relevant invitation letters, which may assist Chinese immigration authorities
          in verifying your purpose of visit. CTS Tours recommends checking the Ministry of Foreign Affairs of the
          People&apos;s Republic of China website for the most current policy before departure.
        </p>
        <h3 className={h3Class}>Japan Visitor Visa</h3>
        <p className={pClass}>
          New Zealand citizens do not require a tourist visa for visits to Japan of up to 90 days for tourism, business,
          visiting friends or relatives, or other unpaid activities. For further information:{' '}
          <a
            href="https://www.nz.emb-japan.go.jp"
            className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            nz.emb-japan.go.jp
          </a>
        </p>
        <h3 className={h3Class}>South Korea Visitor Visa</h3>
        <p className={pClass}>
          New Zealand passport holders wishing to enter South Korea for short-term stays of up to 90 days may apply for
          the K-ETA (Korea Electronic Travel Authorisation) before travel. For further information:{' '}
          <a
            href="https://overseas.mofa.go.kr"
            className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            overseas.mofa.go.kr
          </a>
        </p>
        <h3 className={h3Class}>Vietnam Visitor Visa</h3>
        <p className={pClass}>
          From 15 August 2023, Vietnam grants e-visas for citizens of all countries and territories with 90-day stay
          duration, valid for multiple entry. For further information:{' '}
          <a
            href="https://vietnam.travel/plan-your-trip/visa-requirements"
            className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            vietnam.travel — visa requirements
          </a>
        </p>
      </section>

      <section id="insurance" className={sectionClass}>
        <h2 className={h2Class}>Travel Insurance</h2>
        <p className={pClass}>
          During your holiday, certain risks and dangers may arise beyond the control of CTS Tours, including but not
          limited to: the hazards of travelling in undeveloped areas; travel by boat, cruise, train, aircraft, bus, or
          other means of transportation; forces of nature; political unrest; terrorism; robbery and other activities of
          lawlessness; and accident or illness in remote regions lacking means of rapid evacuation or medical facilities.
          CTS Tours will not be liable for the provision of medical care or the adequacy of any care that is rendered.
        </p>
        <p className={pClass}>
          CTS Tours strongly recommends the purchase of comprehensive insurance at the time of booking to ensure immediate
          protection of your deposit. Please contact us for a quotation if you are a New Zealand resident. CTS Tours is
          not authorised to sell insurance to non-New Zealand residents. It is the customer&apos;s responsibility to ensure
          they are adequately covered by insurance before trip commencement and for the duration of their travel
          arrangements. CTS Tours cannot be made liable for the loss of deposits, cancellation costs, and any other costs
          incurred by the customer on any tour if not adequately insured.
        </p>
        <p className={pClass}>
          Travel insurance policy details must be provided no later than 30 days before departure to avoid delays in the
          dispatch of travel documentation.
        </p>
      </section>

      <section id="health" className={sectionClass}>
        <h2 className={h2Class}>Health Requirements</h2>
        <p className={pClass}>
          All customers must possess physical and mental fitness sufficient to travel and are required to familiarise
          themselves with any health requirements specific to the countries being visited. Customers with a pre-existing
          medical condition that may affect their fitness to travel, or any medical or dietary requirements, must advise
          CTS Tours when booking their tour and may be required to provide written confirmation from their doctor that they
          are able to travel. All customers should visit their doctor to confirm they are physically able to undertake the
          day-to-day requirements of the tour. Should any ailments either exist at the time of booking, or arise before
          departure from New Zealand, the customer must inform CTS Tours of these in writing. It is the customer&apos;s
          responsibility to ensure they have adequate insurance cover for any pre-existing medical conditions. All
          travellers are advised to check destination-specific information and vaccination requirements with their doctors
          and on the relevant government website.
        </p>
      </section>

      <section id="accommodation" className={sectionClass}>
        <h2 className={h2Class}>Accommodation</h2>
        <p className={pClass}>
          Accommodation will vary depending on group size and cannot be confirmed until final documentation is dispatched
          or close to departure. All hotels listed in our materials are intended to be used on all departures but cannot be
          guaranteed. If the hotels are unavailable for any reason, CTS Tours reserves the right to provide substitutes of
          similar standard. All ratings shown are based on local standards. Room types are on a request basis only and
          cannot be guaranteed before departure. Standard check-in time tends to be 2–4pm or later and check-out is
          normally 11am, but may vary by destination. Non-smoking rooms are requested by default but cannot be guaranteed.
          Special requests can be passed on but cannot be guaranteed. Loyalty membership benefits do not apply. Please
          consult your tour guide before using any WiFi or pay TV services as these are generally not included in the
          room rate.
        </p>
      </section>

      <section id="airlines" className={sectionClass}>
        <h2 className={h2Class}>Airlines</h2>
        <p className={pClass}>
          Airlines featured in our materials do not, by virtue of their endorsement, represent themselves either as
          contracting with any purchaser of a holiday from CTS Tours or as having any legal relationship with such a
          purchaser. Loyalty membership benefits do not apply.
        </p>
        <p className={pClass}>
          Airlines may apply fuel levy surcharges in addition to the normal ticket price. As fuel prices may fluctuate,
          so too will the amount airlines charge for this levy. This amount will be advised at the time of booking and is
          subject to change until tickets are issued.
        </p>
      </section>

      <section id="transfers" className={sectionClass}>
        <h2 className={h2Class}>Transfers</h2>
        <p className={pClass}>
          Group shared transfers are at designated times and destinations. No refunds are provided for unused transfers.
          The type of vehicle used is dependent upon group size. Transfers outside the set group arrangements or dates are
          at additional cost to the customer.
        </p>
      </section>

      <section id="cruise" className={sectionClass}>
        <h2 className={h2Class}>Cruise Packages</h2>
        <p className={pClass}>
          CTS Tours cruise packages are based on special group allotments whereby cabins are assigned by the cruise
          operator on a run-of-house basis close to departure. Cabins may have obstructed views. We cannot guarantee that
          specific requests for cabins or locations can be fulfilled. Room types are on a request basis only and cannot be
          guaranteed. Any discounts or benefits associated with personal loyalty memberships do not apply to our special
          group packages. Cruises that depart from countries abroad, such as from Asia, may be culturally enriching cruises
          whereby guests are immersed in local culture, entertainment, activities, customs and language. English will
          always be spoken by cruise staff.
        </p>
      </section>

      <section id="baggage" className={sectionClass}>
        <h2 className={h2Class}>Baggage</h2>
        <p className={pClass}>
          The standard check-in baggage allowance for all airlines is limited to one piece per person and must not exceed
          20kg, unless otherwise explicitly stated. Carry-on baggage is limited to one piece and must not exceed 7kg per
          person. The baggage allowance on tour coaches is limited to one piece and must not exceed 20kg per person unless
          otherwise explicitly stated. Any extra baggage fees, porterage handling fees and tips are payable by the
          traveller.
        </p>
      </section>

      <section id="shopping" className={sectionClass}>
        <h2 className={h2Class}>Shopping</h2>
        <p className={pClass}>
          Participants may be given the opportunity to shop at local speciality stores en route to tour attractions. There
          is no obligation to buy and absolutely no minimum spend requirement. CTS Tours and its employees are not
          qualified nor permitted to ensure or guarantee the quality or value of any goods purchased or the suitability
          of any retail outlets visited. In all cases the purchase of goods and the use of a credit card for those
          transactions are entirely at the customer&apos;s own risk and at all times the customer must exercise their own
          discretion.
        </p>
      </section>

      <section id="tipping" className={sectionClass}>
        <h2 className={h2Class}>Tipping</h2>
        <p className={pClass}>
          Tipping is a standard element of the tourism industry. Tipping is prepaid in New Zealand prior to your departure
          date. The amount payable for each tour is shown in the tour price and CTS Tours will advise the exact amount
          required per person at the time of booking. Tipping amounts are based on the tour itinerary and length and are
          subject to change.
        </p>
      </section>

      <section id="smoking" className={sectionClass}>
        <h2 className={h2Class}>Smoking</h2>
        <p className={pClass}>
          For the comfort of other participants, smoking is not permitted on CTS Tours arranged transportation. CTS Tours
          requests non-smoking rooms for all occupants as standard. Smoking is not permitted in many hotels, public places
          and parts of cruise vessels.
        </p>
      </section>

      <section id="minors" className={sectionClass}>
        <h2 className={h2Class}>Travel With Minors</h2>
        <p className={pClass}>
          Children under 18 years of age must be accompanied by an adult and share their accommodation with an adult.
          Child discounts are generally not applicable for our packages; however, they may apply to infants under 2 years
          of age not requiring a seat, bed and breakfast. Requests for interconnecting rooms cannot be guaranteed.
        </p>
      </section>

      <section id="single" className={sectionClass}>
        <h2 className={h2Class}>Single Travellers</h2>
        <p className={pClass}>
          A single supplement applies to any customers travelling alone or requiring a single room for themselves. This
          includes cancellations whereby the remaining occupant(s) require single room(s). Single supplement fees also apply
          to any rail or cruise components and cannot be waived. CTS Tours does not arrange pairing of solo travellers.
        </p>
      </section>

      <section id="triple" className={sectionClass}>
        <h2 className={h2Class}>Triple Share</h2>
        <p className={pClass}>
          Triple share may not be available on all land and cruise packages. A single supplement is payable where triple
          share is not available.
        </p>
      </section>

      <section id="special-assistance" className={sectionClass}>
        <h2 className={h2Class}>Special Assistance</h2>
        <p className={pClass}>
          Travellers requiring special assistance must be accompanied by a physically able companion. Any disability or
          medical condition requiring special attention must be declared at the time of booking. CTS Tours will make
          reasonable efforts to accommodate special needs but is not responsible for any denial of services or additional
          expenses by carriers, hotels, trains, restaurants or other third party suppliers. Coaches and minibuses are not
          equipped with wheelchair ramps. Wheelchairs and walkers cannot be carried on board vehicles due to space
          limitations. Various activities may involve strenuous activity or extensive walking, sitting or standing. CTS
          Tours cannot provide individual assistance to any passenger for walking, dining, boarding or alighting from
          transportation vehicles, or any other personal needs.
        </p>
      </section>

      <section id="special-requests" className={sectionClass}>
        <h2 className={h2Class}>Special Requests</h2>
        <p className={pClass}>
          CTS Tours will make every effort to pass on special requests such as dietary requirements, seat assignments,
          room locations and wheelchair requests to the airline, hotel and other suppliers, but cannot guarantee such
          requests can be met.
        </p>
      </section>

      <section id="breakaway" className={sectionClass}>
        <h2 className={h2Class}>Breakaway Policy</h2>
        <p className={pClass}>
          It is a condition of participation on all CTS Tours group tours that all participants strictly stay with the group
          according to the predetermined itinerary at all times from beginning to end.
        </p>
        <p className={pClass}>
          Any application to leave or break away from the group at any stage of the tour, or deviate in any way from the
          set group itinerary, must be submitted in advance by writing to CTS Tours for special consideration.
        </p>
        <p className={pClass}>
          Any approval by CTS Tours is subject to completion of a Waiver of Responsibility Form and prompt payment of a
          Breakaway Fee from $100 per person. The actual amount payable is to be determined on an individual case by case
          basis at the time of application.
        </p>
        <p className={pClass}>
          Any breakaway or deviation is taken as an understanding by the participant that all group-based arrangements and
          services are voluntarily forfeited and void. Any arrangements upon breakaway from the group are at the
          applicant&apos;s own cost and risk.
        </p>
        <h3 className={h3Class}>Before departure</h3>
        <ul className={ulClass}>
          <li>The applicant must notify CTS Tours in writing of their intention to break away or deviate from the group before booking is finalised and in advance of departure. Late applications cannot be considered.</li>
          <li>The application must clearly explain the reason for the breakaway and include details of all passengers, dates, times and itinerary of the planned deviation.</li>
          <li>Prior consent must be provided in writing by CTS Tours. Any approval is subject to payment of a Breakaway Fee quoted at the time of application. Payment must be immediately remitted in full upon approval.</li>
          <li>Any change in circumstances or plans must be communicated to CTS Tours prior to departure and is subject to reassessment.</li>
        </ul>
        <h3 className={h3Class}>After departure</h3>
        <ul className={ulClass}>
          <li>The applicant agrees to notify the local tour guide of the special arrangements while on tour with the group before the breakaway. The tour guide is not authorised to make exceptions to this policy.</li>
          <li>All CTS Tours group-based arrangements and services are deemed void and forfeited. The applicant agrees not to use any group services — such as but not limited to hotel accommodation, transfers and air tickets — at any point during or after the breakaway, unless written consent is explicitly provided by CTS Tours before commencement of the trip.</li>
          <li>The applicant agrees not to rejoin the tour, or use any group services provided by CTS Tours, at any stage during or after the breakaway, unless written consent is explicitly provided by CTS Tours before commencement of the trip.</li>
          <li>The applicant agrees that they are not entitled to any refund for any unused or partially used services arranged by CTS Tours.</li>
          <li>The applicant agrees that all services undertaken upon breakaway from the group, including accommodation and transportation, are to be self-arranged and associated costs are borne by the applicant.</li>
          <li>The applicant agrees that they are not covered by any insurance provided by CTS Tours for any act or mishap during or after the breakaway, and agrees that CTS Tours is absolved of all responsibility and liability therein.</li>
        </ul>
      </section>

      <section id="responsibility" className={sectionClass}>
        <h2 className={h2Class}>Responsibility</h2>
        <p className={pClass}>
          CTS Tours works as a co-ordinator for all persons taking these tours in the making of all arrangements for
          transportation, sightseeing and hotel accommodation. CTS Tours does not own, manage, control or operate any
          transportation vehicle, any hotel or restaurant or any other supplier of services. All coupons, receipts and
          tickets are issued subject to the terms and conditions specified by the supplier and all services are subject to
          the laws of the country where the services are provided. CTS Tours assumes no responsibility for the loss or
          damage to baggage or property or for any injury, illness or death or for any damages or claims whatsoever caused
          arising directly or indirectly from accidents, loss or damage to person or property, delays, transport failure,
          strikes, and wars etc over which CTS Tours has no control.
        </p>
      </section>

      <section id="exclusions" className={sectionClass}>
        <h2 className={h2Class}>Exclusions</h2>
        <p className={pClass}>
          Optional tours, optional shore excursions, admissions and attraction tickets, tour guide/driver/baggage handler
          tipping, cruise gratuities, meals and drinks other than those specified on the itinerary, passport and visa fees,
          vaccinations, city and resort taxes/fees, government taxes, laundry service, Wi-Fi internet, baggage and
          miscellaneous airline fees, travel insurance, credit card processing fees, personal expenditure, and anything not
          mentioned on the itinerary are not included in our packages, unless explicitly stated otherwise.
        </p>
      </section>

      <section id="cga" className={sectionClass}>
        <h2 className={h2Class}>Consumer Guarantees Act 1993</h2>
        <p className={pClass}>
          Nothing in these terms and conditions is intended to limit or exclude any rights you have under the Consumer
          Guarantees Act 1993 or the Fair Trading Act 1986. If you are acquiring services for personal use, your consumer
          rights under those Acts apply and cannot be contracted out of. To the extent any term in these conditions is
          inconsistent with your rights under applicable New Zealand consumer legislation, that term will not apply.
        </p>
      </section>

      <section id="privacy" className={sectionClass}>
        <h2 className={h2Class}>Privacy Policy</h2>
        <p className={pClass}>
          CTS Tours collects and handles personal information in accordance with the Privacy Act 2020. The collection of
          passport and personal information for ticket issuance, visa application and other purposes is a requirement by
          airlines and travel operators for identification and operational purposes.
        </p>
        <p className={pClass}>
          Personal information is passed on to relevant third party suppliers and vendors that provide or govern the
          products and services pertaining to your travel, such as but not limited to providers for air tickets, hotels,
          cruises, local tours and attractions, coaches and transfers, and travel insurance. Personal data may also be
          provided to government or public authorities such as customs, immigration and security services.
        </p>
        <p className={pClass}>
          All personal data, with the exception of credit card details, will be stored. CTS Tours will use only names and
          contact details for marketing purposes unless you notify us in writing that you do not wish to receive marketing
          material, or want your personal information to be deleted from our database. You have the right to request access
          to and correction of any personal information we hold about you.
        </p>
        <p className={pClass}>
          CTS Tours will take reasonable steps to ensure that all information collected is stored in a secure environment
          accessed only by authorised persons. While CTS Tours strives to protect personal information from misuse and
          unauthorised access, the security of information transmitted or received through online forms cannot be fully
          guaranteed.
        </p>
      </section>

      <section id="addresses" className={sectionClass}>
        <h2 className={h2Class}>Addresses</h2>
        <p className={pClass}>
          By providing email and postal addresses on the Booking Form you have agreed to receive correspondence from CTS
          Tours which may contain marketing, specials and promotional material. You may opt out at any time by notifying CTS
          Tours in writing.
        </p>
      </section>

      <section id="refusal-carriage" className={sectionClass}>
        <h2 className={h2Class}>Refusal of Carriage</h2>
        <p className={pClass}>
          CTS Tours retains the right to remove customers from our group for reasons that impact on the enjoyment or safety
          of other tour members, such as but not limited to the physical, medical or mental inability of customers to
          undertake the arrangements of the tour, unsocial or unruly behaviour, or the carriage of prohibited substances
          and materials. CTS Tours will not refund or cover any costs incurred for termination of holiday arrangements due
          to unacceptable behaviour.
        </p>
      </section>

      <section id="refusal-service" className={sectionClass}>
        <h2 className={h2Class}>Refusal of Service</h2>
        <p className={pClass}>
          CTS Tours reserves the right to refuse service at any stage before or after booking to any customer or agent that
          we reasonably determine:
        </p>
        <ul className={ulClass}>
          <li>Is disrespectful or abusive to our staff.</li>
          <li>Is likely to disrupt the smooth running of our daily business or tour operations.</li>
          <li>Is likely to engage in anti-social, unethical or immoral behaviour, or any behaviour that may jeopardise the safety or enjoyment of other tour participants.</li>
          <li>Is likely to undermine the integrity, or bring into disrepute, our company in any way or form.</li>
          <li>Has expectations or demands that are unable to be satisfied, unrealistically or unreasonably excessive, misaligned or incompatible with our core values, or inconsistent with the product or service standards we can deliver.</li>
          <li>Is in breach of our Booking Conditions.</li>
        </ul>
        <p className={pClass}>
          In the event that payments have been received, and on the premise that travel documents have not been issued,
          CTS Tours may opt to offer a partial or full refund as deemed appropriate at our sole discretion.
        </p>
      </section>

      <section id="hotel-media" className={sectionClass}>
        <h2 className={h2Class}>Hotel Descriptions, Maps & Pictures</h2>
        <p className={pClass}>
          Hotel descriptions in our materials are based on current hotel guides provided by suppliers and contractual
          agreements. Any facilities described are subject to change at any time. Maps and photographs are included for
          general information only and may not necessarily reflect actual routings, location or services. CTS Tours has made
          reasonable enquiries to verify that descriptions and details are accurate but does not warrant that they are.
        </p>
      </section>

      <section id="travel-docs" className={sectionClass}>
        <h2 className={h2Class}>Travel Documentation</h2>
        <p className={pClass}>
          As our packages are group tours, group bookings are finalised as a whole — including final name lists for group
          air tickets, hotel reservations, coach assignments etc — close to the departure date before individual final
          documentation packs can be sent out. Documentation is issued on a group by group and sequential basis, with
          earlier departure dates taking priority.
        </p>
        <p className={pClass}>
          The standard turnaround time for sending out final documentation is within 2 weeks of departure. During peak
          periods, higher than usual booking volumes may affect standard turnaround times. CTS Tours endeavours to send out
          documentation as soon as possible once all information becomes fully available and confirmed.
        </p>
      </section>

      <section id="complaints" className={sectionClass}>
        <h2 className={h2Class}>Complaints or Claims Resolution</h2>
        <p className={pClass}>
          CTS Tours is committed to ensuring that complaints are dealt with effectively and efficiently.
        </p>
        <h3 className={h3Class}>Issues During Your Tour</h3>
        <p className={pClass}>
          Where an issue arises during the tour, we ask that it be brought to the attention of your local guide or tour
          escort as soon as possible. This gives CTS Tours the opportunity to address the matter promptly and find a
          resolution while you are still travelling. Raising concerns during the tour does not affect your right to submit
          a formal written complaint after your return, but may significantly assist in resolving the issue to your
          satisfaction at the time.
        </p>
        <h3 className={h3Class}>Formal Complaints After Your Return</h3>
        <p className={pClass}>
          Should you not be satisfied with any aspect of your arrangements and the matter was not resolved during the tour,
          you may lodge a formal complaint in writing to CTS Tours by submission of a CTS Tours Claim Form within 30 days
          of the date of completion of your CTS Tours arrangements. Relevant receipts and substantiating evidence must be
          attached to the claim.
        </p>
      </section>

      <section id="lost-property" className={sectionClass}>
        <h2 className={h2Class}>Lost Property</h2>
        <p className={pClass}>
          For security reasons, valuables should be kept to a minimum. It is the traveller&apos;s sole responsibility to
          ensure adequate insurance cover for loss of personal belongings and luggage. CTS Tours takes no responsibility
          for any items that are lost or left behind and cannot guarantee that their retrieval is possible.
        </p>
      </section>

      <section id="testimonials" className={sectionClass}>
        <h2 className={h2Class}>Testimonials</h2>
        <p className={pClass}>
          If you have been on a CTS Tours tour and have any comments, suggestions, compliments or constructive feedback,
          we welcome your thoughts through the{' '}
          <Link href="/contact" className="text-primary font-medium underline decoration-primary/30 underline-offset-2 hover:decoration-primary">
            Contact Us
          </Link>{' '}
          section of our website.
        </p>
      </section>

      <footer className="mt-14 border-t border-warm-200 pt-8">
        <p className="text-center text-sm text-gray-600">
          China Travel Service (New Zealand) Limited, trading as CTS Tours
          <br />
          Terms and Conditions — Updated March 2026
        </p>
      </footer>
    </article>
  );
}
