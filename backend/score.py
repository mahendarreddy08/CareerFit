def calculate_weighted_score(matched_skills, job_skills, job_weights):
    total_points = 0
    candidate_points = 0

    for skill in job_skills:
        if skill in job_weights:
            total_points += job_weights[skill]

    for skill in matched_skills:
        if skill in job_weights:
            candidate_points += job_weights[skill]

    if total_points == 0:
        return 0

    score = (candidate_points / total_points) * 100

    return score


