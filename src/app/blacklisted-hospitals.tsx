import HospitalListScreen from "@/components/HospitalListScreen";
import { blacklistedHospitals } from "@/constants/hospitalData";

export default function BlacklistedHospitalsScreen() {
  return (
    <HospitalListScreen
      title="Blacklisted Hospitals"
      hospitals={blacklistedHospitals}
    />
  );
}
