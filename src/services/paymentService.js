import usePosStore from "@/store/usePosStore";
import orderService from "./orderService";

const paymentService = {
  async pay() {
    const store = usePosStore.getState();

    store.addTimeline("💳 Processing payment...", "thinking");

    await new Promise((resolve) => setTimeout(resolve, 1800));

    store.addTimeline("✅ Payment Successful", "success");
    store.addTimeline("🧾 Order Completed", "success");

    orderService.clear();

    store.navigate("TABLES");
  },
};

export default paymentService;
