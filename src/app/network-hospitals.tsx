import { fetchNetworkHospitals } from "@/api/insuranceApi";
import HospitalListScreen from "@/components/HospitalListScreen";
import LoadingView from "@/components/LoadingView";
import { useApi } from "@/hooks/useApi";

export default function NetworkHospitalsScreen() {
  const { data, loading, error } = useApi(fetchNetworkHospitals, []);

  if (loading || error || !data) {
    return <LoadingView error={error} />;
  }

  return <HospitalListScreen title="Network Hospitals" hospitals={data} />;
}
