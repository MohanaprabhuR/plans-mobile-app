import HospitalListScreen from "@/components/HospitalListScreen";
import { networkHospitals } from "@/constants/hospitalData";

export default function NetworkHospitalsScreen() {
  return (
    <HospitalListScreen
      title="Network Hospitals"
      hospitals={networkHospitals}
    />
  );
}
