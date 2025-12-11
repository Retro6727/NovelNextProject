export const revalidate = 0;

export default function PoliciesPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Policies — Returns, Shipping & Bulk Orders</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Return & Refund Policy</h2>
        <p className="mb-3">At Novel Solution we aim to provide high-quality products and excellent customer service. If you are not fully satisfied with your purchase, you may request a return or refund under the terms below:</p>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">1. Eligibility for Returns</h3>
          <p className="mt-2">You may request a return if:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>The product is damaged, defective, or incorrect</li>
            <li>The item received is different from what was ordered</li>
            <li>The product is unused, unopened, and in its original packaging</li>
          </ul>

          <p className="mt-3 font-semibold">Non-returnable items include:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Used or partially consumed products</li>
            <li>Cleaning chemicals that have been opened</li>
            <li>Customized or special-order items</li>
            <li>Items purchased under clearance or final-sale offers</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">2. Return Request Timeline</h3>
          <p className="mt-2">You must notify us within:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>48 hours for damaged or defective products</li>
            <li>5 days for standard return requests</li>
          </ul>
          <p className="mt-2">After the given period, returns cannot be accepted.</p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">3. Return Process</h3>
          <p className="mt-2">To start a return, please contact our support team with:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Order number</li>
            <li>Reason for return</li>
            <li>Photo/video evidence (for damaged or incorrect items)</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">4. Refund Policy</h3>
          <p className="mt-2">Refunds are issued after the returned product is inspected. You may receive a refund in the following forms:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Original payment method (online payment refund)</li>
            <li>Product replacement (for damaged or wrong item)</li>
          </ul>
          <p className="mt-2">Refund Processing Time:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>3–7 business days after we receive and verify the returned product</li>
            <li>Bank processing time may vary</li>
          </ul>
          <p className="mt-2">Note: Shipping charges are non-refundable unless the return is due to our error.</p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">5. Exchange Policy</h3>
          <p className="mt-2">Exchanges are available only for damaged items or wrong items delivered. If the desired product is out of stock, we will offer a refund or store credit.</p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">6. Order Cancellation</h3>
          <p className="mt-2">Orders can be canceled before they are shipped. Once the order is dispatched, cancellation is no longer possible, but you may request a return after delivery (where applicable).</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Shipping & Delivery Policy</h2>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">1. Order Processing Time</h3>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>All orders are processed within 1–2 business days.</li>
            <li>Orders placed on weekends or public holidays will be processed on the next business day.</li>
            <li>In case of unexpected delays, customers will be notified via email or phone.</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">2. Shipping Time & Delivery Timeline</h3>
          <p className="mt-2">Delivery time depends on the customer’s location and shipping method:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li><strong>Domestic Shipping:</strong></li>
            <li className="ml-4">Local Delivery: 2–4 business days</li>
            <li className="ml-4">Within the Country: 5–10 business days</li>
          </ul>
          <p className="mt-2">Note: Delivery may be delayed due to weather conditions, courier delays, or holidays.</p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">3. Shipping Charges</h3>
          <p className="mt-2">Shipping charges are calculated at checkout based on:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Delivery location</li>
            <li>Order weight</li>
            <li>Courier service selected</li>
            <li>Depend on courier charges</li>
          </ul>
          <p className="mt-2">Free shipping may be offered on selected orders or promotional events.</p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">4. Order Tracking</h3>
          <p className="mt-2">Once your order is shipped, you will receive a tracking number and a link to track your shipment in real time. Please allow up to 24 hours for the tracking details to update.</p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">5. Delivery Attempts</h3>
          <p className="mt-2">The courier may make 1–3 delivery attempts. If the delivery fails due to customer unavailability or incorrect address, the package may be returned to us. Re-shipping charges may apply for incorrect or incomplete addresses.</p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">6. Order Cancellation</h3>
          <p className="mt-2">Orders can be canceled before they are shipped. Once dispatched, cancellation is no longer possible. You may apply for a return after delivery (according to Return & Refund Policy).</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Bulk Orders & Wholesale Supply</h2>

        <p className="mb-3">Why Bulk Buyers Choose NOVEL SOLUTION</p>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Best Prices for Large Quantity Orders</li>
          <li>Pan-India Delivery for All Materials</li>
          <li>Verified Vendors & Quality-Checked Products</li>
          <li>GeM Partner Support for Government Procurement</li>
          <li>Can supply material with GeM shipping address with good packing (packing charges excluded)</li>
          <li>Fast Sourcing for Urgent Requirements</li>
          <li>Dedicated Support for Corporate Buyers</li>
        </ul>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold">How Bulk Orders Work</h3>
          <ol className="list-decimal list-inside ml-4 mt-2">
            <li>Share your Requirement List — Send product names, quantity, and delivery location.</li>
            <li>Get a Pro-Forma Invoice — We send best price, GST details, and delivery schedule.</li>
            <li>Confirm Order — Approve quotation & proceed with payment.</li>
            <li>Dispatch & Delivery — Bulk shipment organized via safe logistics.</li>
          </ol>
        </div>
      </section>

      <p className="text-sm text-gray-600">If you’d like this information included on the Privacy page, FAQ, or another location, tell me where and I’ll add or cross-link it.</p>
    </main>
  );
}
