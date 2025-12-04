import {ExpiryStatus} from '../enum/expiry-status';

export function computeExpiryStatus(bestBeforeIso: string | null | undefined) : ExpiryStatus {
  if(!bestBeforeIso) {
    return ExpiryStatus.Ok;
  }

  const today = new Date();
  const bestBefore = new Date(bestBeforeIso);

  today.setHours(0, 0, 0, 0);
  bestBefore.setHours(0, 0, 0, 0);

  if(bestBefore < today) {
    return ExpiryStatus.Expired;
  }

  const diffMs = bestBefore.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if(diffDays <= 2) {
    return ExpiryStatus.Soon;
  }

  return ExpiryStatus.Ok;
}
