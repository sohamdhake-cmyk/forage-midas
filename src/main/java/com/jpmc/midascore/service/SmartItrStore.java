package com.jpmc.midascore.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SmartItrStore {

    private volatile UserProfile userProfile = new UserProfile("Guest User", "guest@smartitr.com");
    private volatile QuestionnaireData questionnaireData = new QuestionnaireData(
            "", "", 0, 0, 0, 0, 0, 0
    );

    private final Map<String, Boolean> documents = new ConcurrentHashMap<>();

    public SmartItrStore() {
        documents.put("PAN card", false);
        documents.put("Aadhaar card", false);
        documents.put("Form 16", false);
        documents.put("Bank statement", false);
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public UserProfile updateUserProfile(UserProfile profile) {
        userProfile = profile;
        return userProfile;
    }

    public QuestionnaireData getQuestionnaireData() {
        return questionnaireData;
    }

    public QuestionnaireData saveQuestionnaireData(QuestionnaireData data) {
        questionnaireData = data;
        return questionnaireData;
    }

    public List<DocumentState> getDocuments() {
        List<DocumentState> result = new ArrayList<>();
        documents.forEach((name, linked) -> result.add(new DocumentState(name, linked)));
        result.sort((a, b) -> a.name().compareToIgnoreCase(b.name()));
        return result;
    }

    public List<DocumentState> toggleDocument(String name) {
        if (documents.containsKey(name)) {
            documents.put(name, !documents.get(name));
        }
        return getDocuments();
    }

    public DashboardResponse getDashboard() {
        long linkedCount = documents.values().stream().filter(Boolean::booleanValue).count();
        boolean started = questionnaireData.fullName() != null && !questionnaireData.fullName().isBlank();

        List<DashboardCard> cards = List.of(
                new DashboardCard("Profile Completion", started ? "96%" : "35%", "primary"),
                new DashboardCard("ITR Progress", started ? "Step 5/5" : "Step 1/5", "success"),
                new DashboardCard("Linked Documents", String.valueOf(linkedCount), "warning")
        );

        String tip = linkedCount == 0
                ? "Link Form 16 in DigiLocker to auto-fill salary details."
                : "Great! Continue filing with your linked documents.";

        return new DashboardResponse(userProfile.fullName(), cards, tip);
    }

    public SummaryResponse getSummary() {
        int grossIncome = questionnaireData.annualSalary() + questionnaireData.otherIncome();
        int totalDeductions = questionnaireData.section80C() + questionnaireData.section80D();
        int taxableIncome = Math.max(grossIncome - totalDeductions, 0);
        int estimatedTaxDue = Math.max((int) Math.round(taxableIncome * 0.1) - (questionnaireData.tdsPaid() + questionnaireData.advanceTax()), 0);

        boolean hasData = grossIncome > 0 || totalDeductions > 0;
        List<SummaryItem> items = List.of(
                new SummaryItem("Gross Income", grossIncome),
                new SummaryItem("Total Deductions", totalDeductions),
                new SummaryItem("Taxable Income", taxableIncome),
                new SummaryItem("Estimated Tax Due", estimatedTaxDue)
        );

        return new SummaryResponse(userProfile.fullName(), hasData, items);
    }

    public record UserProfile(String fullName, String email) {
    }

    public record QuestionnaireData(
            String fullName,
            String panNumber,
            int annualSalary,
            int otherIncome,
            int section80C,
            int section80D,
            int tdsPaid,
            int advanceTax
    ) {
    }

    public record DocumentState(String name, boolean linked) {
    }

    public record DashboardCard(String title, String value, String tone) {
    }

    public record DashboardResponse(String userName, List<DashboardCard> cards, String tip) {
    }

    public record SummaryItem(String label, int value) {
    }

    public record SummaryResponse(String userName, boolean hasData, List<SummaryItem> items) {
    }
}
