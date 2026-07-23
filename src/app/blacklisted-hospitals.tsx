import { fetchBlacklistedHospitals } from "@/api/insuranceApi";
import HospitalListScreen from "@/components/HospitalListScreen";
import LoadingView from "@/components/LoadingView";
import { useApi } from "@/hooks/useApi";

export default function BlacklistedHospitalsScreen() {
  const { data, loading, error } = useApi(fetchBlacklistedHospitals, []);

  if (loading || error || !data) {
    return <LoadingView error={error} />;
  }

  return <HospitalListScreen title="Blacklisted Hospitals" hospitals={data} />;
}
